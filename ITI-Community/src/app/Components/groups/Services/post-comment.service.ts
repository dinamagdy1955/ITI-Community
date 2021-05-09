import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IComment } from '../ViewModel/icomment';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  constructor(private db: AngularFirestore) { }


  getPostComments2(postid) {
    // , ref => ref.orderBy('CommentDate', 'desc')
    return this.db.collection('PostGroup').doc(postid).collection('Comments').snapshotChanges();
  }

  deleteComment(id, post) {
    return this.db.collection('PostGroup').doc(post).collection('Comments').doc(id).delete()
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
    return this.db.collection('PostGroup').doc(pid).collection('Comments').doc(cid).update({
      Body: data
    })
  }
}
