import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IComment } from '../ViewModel/icomment';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  constructor(private db: AngularFirestore) { }

  getPostComments() {
    return this.db.collection('PostComments').snapshotChanges()
  }

  writeComment(comment: IComment) {
    return new Promise<any>((res, rej) => {
      this.db
        .collection('PostComments')
        .add(comment)
        .then(
          (res) => { },
          (error) => rej(error)
        );
    });
  }

}
