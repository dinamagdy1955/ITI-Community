import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IHomePost } from '../ViewModel/ihome-post';

@Injectable({
  providedIn: 'root',
})
export class HomePostsService {
  likes: string[] = [];

  constructor(
    private db: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  getAllFriends(id) {
    return this.db
      .collection('users-details')
      .doc(id)
      .collection('friendList')
      .snapshotChanges();
  }

  getMyPosts(uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts', (ref) =>
        ref.where('Auther.id', '==', uid).orderBy('PostedDate', 'desc').limit(6)
      )
      .snapshotChanges();
  }

  getAllMyPosts(uid, param) {
    // if (param != undefined) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts', (ref) =>
        ref.orderBy('PostedDate', 'desc').limit(param)
      )
      .snapshotChanges();

    // } else {
    //     return this.db
    //   .collection('users-details')
    //   .doc(uid)
    //   .collection('MyHomePosts', (ref) =>
    //     ref.orderBy('PostedDate', 'desc').limit(5)
    //   )
    //   .snapshotChanges();
    // }
  }
  // getLatestPost(uid) {
  //   return this.db
  //     .collection('users-details')
  //     .doc(uid)
  //     .collection('MyHomePosts', (ref) =>
  //       ref.orderBy('PostedDate', 'desc').limit(2)
  //     )
  //     .snapshotChanges();
  // }

  MyPostById(postid, uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts')
      .doc(postid)
      .snapshotChanges();
  }

  writePost(post: IHomePost, uid) {
    post.PostedDate = new Date();
    let frindsList: any[] = [];
    this.getAllFriends(uid).subscribe((data) => {
      frindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    new Promise<any>((res, rej) => {
      this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyHomePosts')
        .add(post)
        .then(
          (res) => {
            frindsList.map((e) => {
              this.db
                .collection('users-details')
                .doc(e)
                .collection('MyHomePosts')
                .doc(res.id)
                .set(post);
              this.db
                .collection('users-details')
                .doc(e)
                .collection('Notifications')
                .doc(res.id)
                .set(post);
            });
          },
          (error) => rej(error)
        );
    });
    return;
  }

  getAllNotifications(uid, param?) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('Notifications', (ref) => ref.limit(param))
      .snapshotChanges();
  }

  DeleteNotification(pid, uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('Notifications')
      .doc(pid)
      .delete();
  }

  async uploadImg(imgs) {
    const fileRef = [];
    const task = [];
    for (let img of imgs) {
      let imgNameArr = img.name.split('.');
      let imgName = '';
      for (let i = 0; i <= imgNameArr.length; i++) {
        if (i == imgNameArr.length - 1) break;
        else imgName += imgNameArr[i];
      }
      let filePath =
        'HomePostImg/' +
        imgName +
        '_' +
        (Math.random() * 1024 * 1024).toString(36).substring(2);
      fileRef.push(this.afStorage.ref(filePath));
      task.push(await this.afStorage.upload(filePath, img));
    }
    return {
      ref: fileRef,
      task: task,
    };
  }

  deletePost(pid, post, uid) {
    let myfrindsList: any[] = [];
    this.getAllFriends(uid).subscribe((data) => {
      myfrindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    new Promise<any>((res, rej) => {
      this.db;
      this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyHomePosts')
        .doc(pid)
        .delete()
        .then(
          (res) => {
            myfrindsList.map((e) => {
              this.db
                .collection('users-details')
                .doc(e)
                .collection('MyHomePosts')
                .doc(pid)
                .delete();
            });
          },
          (error) => rej(error)
        );
    });

    return;
  }

  ReportPost(pid, post, uid) {
    this.db
      .collection('users-details')
      .doc(uid)
      .collection('ReportedPosts')
      .doc(pid)
      .set(post.data);

    this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts')
      .doc(pid)
      .delete();
    return;
    // alert('you are Reported this post');
  }

  SpamPost(pid, post, uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts')
      .doc(pid)
      .delete();
  }

  SavePosts(pid, post, uid) {
    if (post.data.savedState === false) {
      return this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyHomePosts')
        .doc(pid)
        .update({
          savedState: true,
        });
    } else {
      return this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyHomePosts')
        .doc(pid)
        .update({
          savedState: false,
        });
    }
  }
  getSavedPosts(uid, param?) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts', (ref) =>
        ref.where('savedState', '==', true).limit(param)
      )
      .snapshotChanges();
  }

  unSavePost(item, uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyHomePosts')
      .doc(item.id)
      .update({
        savedState: false,
      });
  }

  editPost(id, data, uid) {
    let myfrindsList: any[] = [];
    this.getAllFriends(uid).subscribe((data) => {
      myfrindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    new Promise<any>((res, rej) => {
      this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyHomePosts')
        .doc(id)
        .update({
          Body: data,
        })
        .then(
          (res) => {
            myfrindsList.map((e) => {
              this.db
                .collection('users-details')
                .doc(e)
                .collection('MyHomePosts')
                .doc(id)
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

  getAllautIDList(id) {
    return this.db
      .collection('users-details')
      .doc(id)
      .collection('friendList')
      .snapshotChanges();
  }

  giveLike(like, pid, autID) {
    let frindsList: any[] = [];
    this.getAllautIDList(autID).subscribe((data) => {
      frindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });

    let sub2 = this.MyPostById(pid, like).subscribe((res) => {
      this.likes = res.payload.get('Likes');
      if (this.likes.indexOf(like) != -1) {
        this.likes.splice(this.likes.indexOf(like), 1);
      } else {
        this.likes.push(like);
      }

      this.db
        .collection('users-details')
        .doc(autID)
        .collection('MyHomePosts')
        .doc(pid)
        .update({
          Likes: this.likes,
        });

      frindsList.map((e) => {
        this.db
          .collection('users-details')
          .doc(e)
          .collection('MyHomePosts')
          .doc(pid)
          .update({
            Likes: this.likes,
          });
      });
      sub2.unsubscribe();
    });
  }
}
