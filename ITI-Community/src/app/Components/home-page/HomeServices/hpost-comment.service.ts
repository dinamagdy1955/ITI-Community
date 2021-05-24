import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IHomeComment } from '../ViewModel/ihome-comment';

@Injectable({
  providedIn: 'root',
})
export class HPostCommentService {
  postCounts: BehaviorSubject<number>;
  uid = localStorage.getItem('uid');
  constructor(private db: AngularFirestore) {
    this.postCounts = new BehaviorSubject<number>(4);
  }

  //friendList

  getAllFriendsList() {
 

    return this.db
      .collection('users-details')
      .doc(this.uid)
      .collection('friendList')
      .snapshotChanges();


  }


  getAllautIDList(id) {
    return this.db
      .collection('users-details')
      .doc(id)
      .collection('friendList')
      .snapshotChanges();
  }




  writeComment(comment: IHomeComment, postId, AUTHId) {
    let   frindsList: any[] = [];
    //let  authFrindsList: any[] = [];
     this.getAllautIDList(AUTHId)
              .subscribe((data) => {
               frindsList = data.map((e) => {
                  return e.payload.doc.id
                });
                //console.log(frindsList);
              });
    // this.getAllFriendsList()
    // .subscribe((data) => {
    //  frindsList = data.map((e) => {
    //     return e.payload.doc.id
    //   });
    //   //console.log(frindsList);
    // });
    return new Promise<any>((res, rej) => {
      if (this.uid== AUTHId) {
        this.db.collection('users-details').doc(this.uid).collection('MyHomePosts')
        .doc(postId).collection('postsComments').add(comment)
          .then(
            (res) => { 
              console.log(res)
              frindsList.map((e) => {
                console.log(res.id);
                this.db.collection('users-details').doc(e)
                  .collection('MyHomePosts').doc(postId)
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
          .doc(this.uid)
          .collection('MyHomePosts')
          .doc(postId)
          .collection('postsComments')
          .add(comment)
          .then(
            (res) => {
              console.log(res.id);
              this.db
              .collection('users-details').doc(AUTHId)
              .collection('MyHomePosts').doc(postId).collection('postsComments').doc(res.id).set(comment);
      
              frindsList.map((e) => {
             
             this.db.collection('users-details').doc(e)
                .collection('MyHomePosts').doc(postId).collection('postsComments').doc(res.id).set(comment)
              }) },
            (err) => rej(err)
          );
      }
    });
  }
 
  getPostComments2(postId, param?) {
 
  
    if (param != undefined) {
      return this.db
        .collection('users-details').doc(this.uid) .collection('MyHomePosts').doc(postId)
        .collection('postsComments', (ref) => ref.orderBy('CommentDate', 'desc')
        .limit(5).startAfter(param) ).snapshotChanges();
    }
     else {
      
        return this.db
        .collection('users-details').doc(this.uid)
        .collection('MyHomePosts').doc(postId).collection('postsComments', (ref) =>
          ref.orderBy('CommentDate', 'desc').limit(5)).snapshotChanges();
      
     
    }
  }

  getMore() {
    this.postCounts.next(this.postCounts.value + 4);
  }


//COMMENT WRITERAUTHId
  deleteComment(Cid, postId,AUTHId) {
   
    let   frindsList: any[] = [];
    //let  authFrindsList: any[] = [];
     this.getAllautIDList(AUTHId)
              .subscribe((data) => {
               frindsList = data.map((e) => {
                  return e.payload.doc.id
                });
                //console.log(frindsList);
              });
    return new Promise<any>((res, rej) => {
     
        this.db.collection('users-details').doc(AUTHId) .collection('MyHomePosts')
        .doc(postId).collection('postsComments').doc(Cid)
         .delete()
          .then(
            (res) => { 
              console.log(res)
              frindsList.map((e) => {
                this.db.collection('users-details').doc(e)
                  .collection('MyHomePosts').doc(postId)
                  .collection('postsComments').doc(Cid)
                  .delete()
                  })
            },
            (err) => rej(err)
          );
    
    });
  }



  getMyCommentsById(pid, cid) {
    return this.db.collection('users-details').doc(this.uid) .collection('MyHomePosts')
    .doc(pid).collection('Comments').doc(cid).valueChanges()
  }


editComment(pid, cid, data,AUTHId) {
  let   frindsList: any[] = [];
   this.getAllautIDList(AUTHId)
            .subscribe((data) => {
             frindsList = data.map((e) => {
                return e.payload.doc.id
              });
              //console.log(frindsList);
            });
  new Promise<any>((res, rej) => {
    this.db.collection('users-details').doc(AUTHId).collection('MyHomePosts')
    .doc(pid).collection('postsComments').doc(cid)
      .update({
        Body: data,
      })
      .then(
        (res) => {
          frindsList.map((e) => {
            console.log(e)
            console.log(res)
            this.db.collection('users-details').doc(e).collection('MyHomePosts')
            .doc(pid).collection('postsComments').doc(cid)
              .update({
                Body: data,
              })
          });
        },
        (error) => rej(error)
      );
  });

  return;
}

}
