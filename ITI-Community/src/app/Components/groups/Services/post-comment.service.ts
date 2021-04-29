import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IComment } from '../ViewModel/icomment';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  constructor(private db: AngularFirestore) { }

  getPostComments() {
    return this.db.collection('PostComments', ref => ref.orderBy('date', 'desc')).snapshotChanges()
  }

  getCommentById(id) {
    return this.db.collection('PostComments').doc(id).valueChanges();
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

  editComment(id, data) {
    return this.db.collection('PostComments').doc(id).update({
      comment: data
    })
  }

  deleteComment(id) {
    return this.db.collection('PostComments').doc(id).delete()
  }

}
