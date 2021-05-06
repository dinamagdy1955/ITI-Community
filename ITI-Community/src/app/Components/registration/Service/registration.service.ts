import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SignInAuthError } from '../../login/signInInterface/sign-in-auth-error';
import { IUserBasics } from '../ViewModels/iuser-basics';
import { IUserDetails } from '../ViewModels/iuser-details';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  registerInDB(uid, NewUserBasic: IUserBasics, newUserDetails: IUserDetails) {
    this.db.collection('users-basics').doc(uid).set(NewUserBasic);
    this.db.collection('users-details').doc(uid).set(newUserDetails);
    this.auth
      .signInWithEmailAndPassword(NewUserBasic.email, NewUserBasic.password)
      .then((res) => {
        console.log(res);
        res.user.sendEmailVerification().then(() => {
          this.router.navigate(['/Login']);
          return SignInAuthError.Correct;
        });
      });
  }

  async registerNewUser(
    NewUserBasic: IUserBasics,
    newUserDetails: IUserDetails
  ) {
    let result;
    this.auth.fetchSignInMethodsForEmail(NewUserBasic.email).then((r) => {
      if (r.length == 0) {
        this.auth
          .createUserWithEmailAndPassword(
            NewUserBasic.email,
            NewUserBasic.password
          )
          .then(async (responce) => {
            this.registerInDB(responce.user.uid, NewUserBasic, newUserDetails);
          })
          .catch((error) => {
            result = error.code;
            switch (error.code) {
              case 'auth/wrong-password':
                console.log(1);
                return SignInAuthError.WrongPassword;
              case 'auth/user-not-found':
                console.log(2);
                return SignInAuthError.UserNotFound;
              case 'auth/invalid-email':
                console.log(3);
                return SignInAuthError.InvalidEmail;
            }
          });
      } else {
        return SignInAuthError.EmailAlreadyInUse;
      }
    });
  }
}
