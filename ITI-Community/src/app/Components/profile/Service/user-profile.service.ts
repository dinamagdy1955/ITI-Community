import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IExperience } from '../profile-body/ViewModels/iexperience';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private db: AngularFirestore) {}

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
}
