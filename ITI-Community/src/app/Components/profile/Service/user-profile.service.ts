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

  async uploadImg(event) {
    // let downloadURL: Observable<string>;
    // let ref: AngularFireStorageReference;
    // let task: AngularFireUploadTask;

    // let img;
    // const id = Math.random().toString(36).substring(2);
    // this.afStorage.upload('/images' + id + event, event).then((res) => {
    //   console.log(res);
    // });
    // task = ref.put(event);
    // // downloadURL = ref.getDownloadURL();
    // // console.log(downloadURL);
    // task.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.downloadURL = ref.getDownloadURL();
    //     // this.fs.addTest(this.forma.value)
    //     console.log(this.downloadURL);
    //   })
    // );

    const filePath = `proyectos4/` + event.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, event);

    // observe percentage changes
    // get notified when the download URL is available
    let s = await task.snapshotChanges().subscribe(
      async (res) => {
        console.log(res);
        let si = await fileRef.getDownloadURL().subscribe(
          async (r) => {
            console.log(r);
          },
          (err) => {
            console.log('l');
          }
        );
      },

      (err) => {
        console.log('k');
      }
    );
  }
}
