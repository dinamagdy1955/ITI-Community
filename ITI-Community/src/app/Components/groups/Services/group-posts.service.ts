import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPost } from '../ViewModel/ipost';
import * as firestore from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class GroupPostsService {
  likes: string[]
  constructor(private db: AngularFirestore) { }

  getGroupPost() {
    return this.db.collection('GroupPosts').snapshotChanges()
  }

  giveLike(like, id) {

    this.getGroupPost().subscribe((res) => {
      this.likes = res.map(e => {
        return {
          ...(e.payload.doc.get("Likes"))
        }
      })
      console.log(this.likes)

    })
    console.log(like)
    this.likes.push(like)
    let LikeRef = this.db.collection('GroupPosts').doc(id);
    LikeRef.ref.update({
      Likes: this.likes
    });
  }

  writePost(post: IPost) {
    return new Promise<any>((res, rej) => {
      this.db.collection('GroupPosts').add(post).then(res => { }, error => rej(error));
    })
  }

}
