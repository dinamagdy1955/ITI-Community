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

  //friendList
  getAllFriendsList() {
    let uid = localStorage.getItem('uid');

    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendList')
      .snapshotChanges();


  }

  writeComment(comment: IHomeComment, postId, AUTHId) {
    let uid = localStorage.getItem('uid');
    let   frindsList: any[] = [];
    this.getAllFriendsList()
    .subscribe((data) => {
     frindsList = data.map((e) => {
        return e.payload.doc.id
      });
      //console.log(frindsList);
    });
    return new Promise<any>((res, rej) => {
      if (uid == AUTHId) {
        this.db.collection('users-details').doc(uid) .collection('MyPosts')
        .doc(postId).collection('postsComments').add(comment)
          .then(
            (res) => { 
              console.log(res)
              frindsList.map((e) => {
                console.log(res.id);
                this.db.collection('users-details').doc(e)
                  .collection('MyFriendsPosts').doc(postId)
                  .collection('postsComments').doc(res.id)
                  .set(comment);
                  })
            },
            (err) => rej(err)
          );
      }
       else {
        this.db
          .collection('users-details')
          .doc(uid)
          .collection('MyFriendsPosts')
          .doc(postId)
          .collection('postsComments')
          .add(comment)
          .then(
            (res) => {
              console.log(res.id);
              this.db
              .collection('users-details').doc(AUTHId)
              .collection('MyPosts').doc(postId).collection('postsComments').doc(res.id).set(comment);

              frindsList.map((e) => {
             
             this.db.collection('users-details').doc(e)
                .collection('MyFriendsPosts').doc(postId).collection('postsComments').doc(res.id).set(comment)
              }) },
            (err) => rej(err)
          );
      }
    });
  }

  getPostComments2(postId, param?) {
    let uid = localStorage.getItem('uid');
  
    if (param != undefined) {
      return this.db
        .collection('users-details').doc(uid) .collection('MyPosts').doc(postId)
        .collection('postsComments', (ref) => ref.orderBy('CommentDate', 'desc')
        .limit(5).startAfter(param) ).snapshotChanges();
    }
     else {
      
        return this.db
        .collection('users-details').doc(uid)
        .collection('MyPosts').doc(postId).collection('postsComments', (ref) =>
          ref.orderBy('CommentDate', 'desc').limit(5)).snapshotChanges();
      
     
    }
  }

  getFriendPostComments(postId, param?) {
    let uid = localStorage.getItem('uid');
    if (param != undefined) {
      return this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyFriendsPosts')
        .doc(postId)
        .collection('postsComments', (ref) =>
          ref.orderBy('CommentDate', 'desc').limit(5).startAfter(param)
        )
        .snapshotChanges();
    } else {
      return this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyFriendsPosts')
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

  // deleteComment(Cid, postID) {
  //   let uid = localStorage.getItem('uid');
  //   return this.db
  //   .collection('users-details')
  //   .doc(uid).collection('MyPosts').doc(postID).collection('postsComments').doc(Cid)
  //   .delete();
 
  // }


//COMMENT WRITERAUTHId
  deleteComment(Cid, postId,AUTHId) {
    let uid = localStorage.getItem('uid');
    let   frindsList: any[] = [];
    this.getAllFriendsList()
    .subscribe((data) => {
     frindsList = data.map((e) => {
        return e.payload.doc.id
      });
      //console.log(frindsList);
    });
    return new Promise<any>((res, rej) => {
      if (uid == AUTHId) {
        this.db.collection('users-details').doc(uid) .collection('MyPosts')
        .doc(postId).collection('postsComments').doc(Cid)
         .delete()
          .then(
            (res) => { 
              console.log(res)
              frindsList.map((e) => {
                this.db.collection('users-details').doc(e)
                  .collection('MyFriendsPosts').doc(postId)
                  .collection('postsComments').doc(Cid)
                  .delete()
                  })
            },
            (err) => rej(err)
          );
      }
       else {
        this.db
          .collection('users-details')
          .doc(uid)
          .collection('MyFriendsPosts')
          .doc(postId)
          .collection('postsComments').doc(Cid)
          .delete()
          .then(
            (res) => {
             
              this.db
                .collection('users-details')
                .doc(AUTHId)
                .collection('MyPosts')
                .doc(postId)
                .collection('postsComments')
                .doc(Cid)
         .delete()
            },

            
            (err) => rej(err)
          );
      }
    });
  }













}
