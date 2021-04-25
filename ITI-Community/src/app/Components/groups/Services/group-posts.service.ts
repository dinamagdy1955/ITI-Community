import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPost } from '../ViewModel/ipost';
import * as firestore from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class GroupPostsService {
  likes: string[];
  constructor(private db: AngularFirestore) {}

  getGroupPost() {
    return this.db.collection('GroupPosts').snapshotChanges();
  }

  giveLike(like, id) {
    let sub = this.getGroupPost().subscribe((res) => {
      res.map((e) => {
        if (id == e.payload.doc.id) {
          this.likes = e.payload.doc.get('Likes');
          this.likes.push(like);
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
          (res) => {},
          (error) => rej(error)
        );
    });
  }
}
