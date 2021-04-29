import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
}
