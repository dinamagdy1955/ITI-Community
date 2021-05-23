import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IComment } from '../ViewModel/icomment';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  postCounts: BehaviorSubject<number>
  constructor(private db: AngularFirestore) {
    this.postCounts = new BehaviorSubject<number>(4)
  }



  getPostComments2(postid, param?) {
    if (param != undefined) {
      return this.db.collection('PostGroup').doc(postid).collection('Comments', ref => ref.orderBy('CommentDate', 'desc').limit(5).startAfter(param)).snapshotChanges();
    } else {
      return this.db.collection('PostGroup').doc(postid).collection('Comments', ref => ref.orderBy('CommentDate', 'desc').limit(5)).snapshotChanges();
    }
  }

  deleteComment(id, post) {
    return this.db.collection('PostGroup')
    .doc(post).collection('Comments').doc(id).delete()
  }

  getCommentById(pid, cid) {
    return this.db.collection('PostGroup').doc(pid).collection('Comments').doc(cid).valueChanges()
  }

  writeComment(comment: IComment, postId) {
    return new Promise<any>((res, rej) => {
      this.db.collection('PostGroup').doc(postId).collection('Comments').add(comment).then((res) => { }, (err) => rej(err))
    });
  }

  editComment(pid, cid, data) {
    return this.db.collection('PostGroup')
    .doc(pid).collection('Comments').doc(cid).update({
      Body: data
    })
  }

  getMore() {
    this.postCounts.next(this.postCounts.value + 4)
  }
}
