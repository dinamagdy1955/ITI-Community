import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUserBasics } from '../ViewModels/iuser-basics';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  checkUserFound(NewUserBasic: IUserBasics) {
    return this.auth.fetchSignInMethodsForEmail(NewUserBasic.email);
  }
  createUserAccount(NewUserBasic: IUserBasics) {
    return this.auth.createUserWithEmailAndPassword(
      NewUserBasic.email,
      NewUserBasic.password
    );
  }
}
