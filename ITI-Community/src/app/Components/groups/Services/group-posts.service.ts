import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPost } from '../ViewModel/ipost';

@Injectable({
  providedIn: 'root',
})
export class GroupPostsService {
  likes: string[];
  constructor(private db: AngularFirestore) { }

  getGroupPost() {
    return this.db.collection("GroupPosts", ref => ref.orderBy('PostedDate', 'desc')).snapshotChanges();
  }

  getPostById(id) {
    return this.db.collection("GroupPosts").doc(id).valueChanges();
  }


  // test(id) {
  //   let userRef = this.db.collection('users-details').
  //   return this.db.collection('GroupPosts', ref=>  ref.where('UserId', '==', ''))
  // }

  giveLike(like, id) {
    let sub = this.getGroupPost().subscribe((res) => {
      res.map((e) => {
        if (id == e.payload.doc.id) {
          this.likes = e.payload.doc.get('Likes');
          console.log(this.likes);
          if (this.likes.indexOf(like) != -1) {
            this.likes.splice(this.likes.indexOf(like), 1);
          } else {
            this.likes.push(like);
          }
          let LikeRef = this.db.collection('GroupPosts').doc(id);
          LikeRef.ref.update({
            Likes: this.likes,
          });
          sub.unsubscribe();
        }
      });
    });
  }

  writePost(post: IPost) {
    return new Promise<any>((res, rej) => {
      this.db
        .collection('GroupPosts')
        .add(post)
        .then(
          (res) => { },
          (error) => rej(error)
        );
    });
  }

  getPostsLikes() {
    return this.db.collection('GroupPosts').snapshotChanges();
  }

  editPost(id, data) {
    return this.db.collection('GroupPosts').doc(id).update({
      Post: data
    })
  }

  deletePost(id) {
    return this.db.collection('GroupPosts').doc(id).delete()
  }

}
