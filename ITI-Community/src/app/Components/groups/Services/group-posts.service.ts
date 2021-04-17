import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPost } from '../ViewModel/ipost';

@Injectable({
  providedIn: 'root'
})
export class GroupPostsService {

  constructor(private db: AngularFirestore) { }

  getGroupPost() {
    return this.db.collection('GroupPosts').snapshotChanges()
  }

  giveLike(likes, id) {
    return this.db.collection('GroupPosts').doc(id).update({
      Likes: likes
    })
  }

  writePost(post: IPost) {
    return new Promise<any>((res, rej) => {
      this.db.collection('GroupPosts').add(post).then(res => { }, error => rej(error));
    })
  }

}
