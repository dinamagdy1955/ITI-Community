import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IHomePost } from '../ViewModel/ihome-post';

@Injectable({
  providedIn: 'root',
})
export class HomePostsService {
  likes: string[]=[];

  constructor(private db: AngularFirestore, private afStorage: AngularFireStorage) { }

  //friendList
  getAllFriendsList() {
    let uid = localStorage.getItem('uid');

    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendList')
      .snapshotChanges();
  }




  getAllMyPosts() {
    let uid = localStorage.getItem('uid');
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyPosts', (ref) =>
        ref.where('PostedDate', '!=', null).orderBy('PostedDate', 'desc')
      )
      .snapshotChanges();
  }

  MyPostById(postid) {
    let uid = localStorage.getItem('uid');
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyPosts')
      .doc(postid)
      .snapshotChanges();
  }

  getAllMyFriendsPosts() {
    let uid = localStorage.getItem('uid');

    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MyFriendsPosts', (ref) =>
        ref.where('PostedDate', '!=', null).orderBy('PostedDate', 'desc')
      )
      .snapshotChanges();
  }

  writePost(post: IHomePost,) {
    let   frindsList: any[] = [];
    this.getAllFriendsList()
    .subscribe((data) => {
     frindsList = data.map((e) => {
        return e.payload.doc.id
      
      });
    });
    let uid = localStorage.getItem('uid');
    new Promise<any>((res, rej) => {
      this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyPosts')
        .add(post)
        .then(
          (res) => {
            frindsList.map((e) => {
              console.log(e)
             this.db.collection('users-details').doc(e).collection('MyFriendsPosts')
             .doc(res.id).set(post)
            })
          },
          (error) => rej(error)
        );
    });

    return;
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

  deletePost(pid, post) {
    let myfrindsList: any[] = [];
    this.getAllFriendsList().subscribe((data) => {
      myfrindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    let uid = localStorage.getItem('uid');
    new Promise<any>((res, rej) => {
      this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyPosts')
        .doc(pid)
        .delete()
        .then(
          (res) => {
            myfrindsList.map((e) => {
              this.db
                .collection('users-details')
                .doc(e)
                .collection('MyFriendsPosts')
                .doc(pid)
                .delete();
            });
          },
          (error) => rej(error)
        );
    });

    return;
  }



  editPost(id, data) {
    let uid = localStorage.getItem('uid');
    let myfrindsList: any[] = [];
    this.getAllFriendsList().subscribe((data) => {
      myfrindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    new Promise<any>((res, rej) => {
      this.db
        .collection('users-details')
        .doc(uid)
        .collection('MyPosts')
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
                .collection('MyFriendsPosts')
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


  getAllFriendsPostsByID(postid) {
    let uid = localStorage.getItem('uid');
    return this.db.collection('users-details').doc(uid).collection('MyFriendsPosts').doc(postid).snapshotChanges()
     
  }

  getAllautIDList(id) {
    

    return this.db
      .collection('users-details')
      .doc(id)
      .collection('friendList')
      .snapshotChanges();
  }



 giveLike(like, pid,autID) {
  let   frindsList: any[] = [];
  let   mfrindsList: any[] = [];


    let uid = localStorage.getItem('uid');

    if(autID!==uid){
      let sub = this.getAllFriendsPostsByID(pid).subscribe(res => {
        this.likes = res.payload.get('Likes')
        if (this.likes.indexOf(like) != -1) {
          this.likes.splice(this.likes.indexOf(like), 1)
        } else {
          this.likes.push(like) 
        }
 this.getAllautIDList(autID).subscribe((data)=>{
mfrindsList=data.map((e)=>{
  return e.payload.doc.id
})
 })
 sub.unsubscribe()
mfrindsList.map((e) => {
  this.db.collection('users-details').doc(e).collection('MyFriendsPosts').doc(pid).update({
    Likes: this.likes })
})
       
 this.db.collection('users-details').doc(autID).collection('MyPosts').doc(pid).update({
          Likes: this.likes
         
        })
       // console.log(this.likes)
  
       
      })
    }
    else {
  let sub2 = this.MyPostById(pid).subscribe(res => {
    this.likes = res.payload.get('Likes')
    if (this.likes.indexOf(like) != -1) {
      this.likes.splice(this.likes.indexOf(like), 1)
    } else {
      this.likes.push(like)
      console.log(this.likes)
    }
    this.getAllFriendsList()
    .subscribe((data) => {
     frindsList = data.map((e) => {
        return e.payload.doc.id
      });
  
    });
    sub2.unsubscribe()
    this.db.collection('users-details').doc(uid).collection('MyPosts').doc(pid).update({
      Likes: this.likes
    })


frindsList.map((e) => {
  this.db.collection('users-details').doc(e).collection('MyFriendsPosts').doc(pid).update({
    Likes: this.likes
   
  })
})

    
  })
}


    
    return
  }


}


