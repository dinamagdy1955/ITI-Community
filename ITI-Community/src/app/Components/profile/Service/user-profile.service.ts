import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IExperience } from '../profile-body/ViewModels/iexperience';
import { finalize } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';
@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  downloadURL: any;
  constructor(
    private db: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  updatePersonalData(
    uid: string,
    FirstName: string,
    LastName: string,
    JobTitle: string
  ) {
    this.db.collection('users-details').doc(uid).update({
      firstName: FirstName,
      lastName: LastName,
      jobTitle: JobTitle,
    });
  }

  updateUserAbout(uid: string, About: string) {
    this.db.collection('users-details').doc(uid).update({
      about: About,
    });
  }

  addUserExp(uid: string, Experience: IExperience[]) {
    Experience[Experience.length - 1].id = this.db.createId();
    this.db.collection('users-details').doc(uid).update({
      experiences: Experience,
    });
  }

  updateUserExp(uid: string, Experience: IExperience) {
    this.db
      .collection('users-details')
      .doc(uid)
      .get()
      .subscribe((res) => {
        let d = res.data();
        let updatedExp = [];
        d['experiences'].map((e) => {
          if (e.id != Experience.id) updatedExp.push(e);
          else updatedExp.push(Experience);
        });
        this.db.collection('users-details').doc(uid).update({
          experiences: updatedExp,
        });
      });
  }

  deleteUserExp(uid: string, Experienceid: string) {
    this.db
      .collection('users-details')
      .doc(uid)
      .get()
      .subscribe((res) => {
        let d = res.data();
        let updatedExp = [];
        d['experiences'].map((e) => {
          if (e.id != Experienceid) updatedExp.push(e);
        });
        this.db.collection('users-details').doc(uid).update({
          experiences: updatedExp,
        });
      });
  }

  async uploadImg(img) {
    let n = Date.now();
    let imgNameArr = img.name.split('.');
    let imgName = '';
    for (let i = 0; i <= imgNameArr.length; i++) {
      if (i == imgNameArr.length - 1) break;
      else imgName += imgNameArr[i];
    }
    const filePath =
      'UsersProfileImages/' +
      imgName +
      '_' +
      (Math.random() * 1024 * 1024).toString(36).substring(2); //+ '-' + n;
    const fileRef = this.afStorage.ref(filePath);
    const task = await this.afStorage.upload(filePath, img);
    return {
      ref: fileRef,
      task: task,
    };
  }

  editUserAvatar(uid: string, url: string) {
    this.db.collection('users-details').doc(uid).update({ avatar: url });
  }

  editUserCoverAvatar(uid: string, url: string) {
    this.db.collection('users-details').doc(uid).update({ avatarCover: url });
  }
}
