import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IHomeComment } from '../ViewModel/ihome-comment';

@Injectable({
  providedIn: 'root',
})
export class HPostCommentService {
  postCounts: BehaviorSubject<number>;
  constructor(private db: AngularFirestore) {
    this.postCounts = new BehaviorSubject<number>(4);
  }

  getAllautIDList(id) {
    return this.db
      .collection('users-details')
      .doc(id)
      .collection('friendList')
      .snapshotChanges();
  }

  writeComment(comment: IHomeComment, postId, AUTHId, uid) {
    let frindsList: any[] = [];
    this.getAllautIDList(AUTHId).subscribe((data) => {
      frindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });

    return new Promise<any>((res, rej) => {
      if (uid == AUTHId) {
        this.db
          .collection('users-details')
          .doc(uid)
          .collection('MyHomePosts')
          .doc(postId)
          .collection('postsComments')
          .add(comment)
          .then(
            (res) => {
              frindsList.map((e) => {
                this.db
                  .collection('users-details')
                  .doc(e)
                  .collection('MyHomePosts')
                  .doc(postId)
                  .collection('postsComments')
                  .doc(res.id)
                  .set(comment);
              });
            },
            (err) => rej(err)
          );
      } else {
        this.db
          .collection('users-details')
          .doc(uid)
          .collection('MyHomePosts')
          .doc(postId)
          .collection('postsComments')
          .add(comment)
          .then(
            (res) => {
              this.db
                .collection('users-details')
                .doc(AUTHId)
                .collection('MyHomePosts')
                .doc(postId)
                .collection('postsComments')
                .doc(res.id)
                .set(comment);

              frindsList.map((e) => {
                this.db
                  .collection('users-details')
                  .doc(e)
                  .collection('MyHomePosts')
                  .doc(postId)
                  .collection('postsComments')
                  .doc(res.id)
                  .set(comment);
              });
            },
            (err) => rej(err)
          );
      }
    });
  }

  getPostComments2(postId, uid, param?) {
    if (param != undefined) {
      return this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyHomePosts')
        .doc(postId)
        .collection('postsComments', (ref) =>
          ref.orderBy('CommentDate', 'desc').limit(5).startAfter(param)
        )
        .snapshotChanges();
    } else {
      return this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyHomePosts')
        .doc(postId)
        .collection('postsComments', (ref) =>
          ref.orderBy('CommentDate', 'desc').limit(5)
        )
        .snapshotChanges();
    }
  }

  getMore() {
    this.postCounts.next(this.postCounts.value + 4);
  }

  //COMMENT WRITERAUTHId
  deleteComment(Cid, postId, AUTHId) {
    let frindsList: any[] = [];
    //let  authFrindsList: any[] = [];
    this.getAllautIDList(AUTHId).subscribe((data) => {
      frindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    return new Promise<any>((res, rej) => {
      this.db
        .collection('users-details')
        .doc(AUTHId)
        .collection('MyHomePosts')
        .doc(postId)
        .collection('postsComments')
        .doc(Cid)
        .delete()
        .then(
          (res) => {
            frindsList.map((e) => {
              this.db
                .collection('users-details')
                .doc(e)
                .collection('MyHomePosts')
                .doc(postId)
                .collection('postsComments')
                .doc(Cid)
                .delete();
            });
          },
          (err) => rej(err)
        );
    });
  }

  getMyCommentsById(pid, cid, uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts')
      .doc(pid)
      .collection('Comments')
      .doc(cid)
      .valueChanges();
  }

  editComment(pid, cid, data, AUTHId) {
    let frindsList: any[] = [];
    this.getAllautIDList(AUTHId).subscribe((data) => {
      frindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    new Promise<any>((res, rej) => {
      this.db
        .collection('users-details')
        .doc(AUTHId)
        .collection('MyHomePosts')
        .doc(pid)
        .collection('postsComments')
        .doc(cid)
        .update({
          Body: data,
        })
        .then(
          (res) => {
            frindsList.map((e) => {
              this.db
                .collection('users-details')
                .doc(e)
                .collection('MyHomePosts')
                .doc(pid)
                .collection('postsComments')
                .doc(cid)
                .update({
                  Body: data,
                });
            });
          },
          (error) => rej(error)
        );
    });

    return;
  }
}
