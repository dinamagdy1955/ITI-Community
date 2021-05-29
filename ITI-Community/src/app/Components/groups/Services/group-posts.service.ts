import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IPost2 } from '../ViewModel/ipost';

@Injectable({
  providedIn: 'root',
})
export class GroupPostsService {
  likes: string[];
  constructor(
    private db: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  GroupPosts(id) {
    return this.db
      .collection('PostGroup', (ref) =>
        ref.where('GroupId', '==', id).orderBy('PostedDate', 'desc')
      )
      .snapshotChanges();
  }

  PostById(postid) {
    return this.db.collection('PostGroup').doc(postid).snapshotChanges();
  }

  editPost(id, data) {
    return this.db.collection('PostGroup').doc(id).update({
      Body: data,
    });
  }



  

  writePost(post: IPost2) {
    return new Promise<any>((res, rej) => {
      this.db
        .collection('PostGroup')
        .add(post)
        .then(
          (res) => {
            
          },
          (error) => rej(error)
        );
    });
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
        'GroupPostImg/' +
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




  
  giveLike(like, id) {
    let sub = this.PostById(id).subscribe((res) => {
      this.likes = res.payload.get('Likes');
      if (this.likes.indexOf(like) != -1) {
        this.likes.splice(this.likes.indexOf(like), 1);
      } else {
        this.likes.push(like);
      }
      this.db.collection('PostGroup').doc(id).update({
        Likes: this.likes,
      });
      sub.unsubscribe();
    });
  }

  deletePost(id) {
    return this.db.collection('PostGroup').doc(id).delete();
  }
}
