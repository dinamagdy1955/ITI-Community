import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInAuthError } from '../../login/signInInterface/sign-in-auth-error';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private auth: AngularFireAuth) {}

  registerNewUser(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(
      (responce) => {
        let uid = responce.user.uid;
        console.log(responce);
        return true;
      },
      (error) => {
        /*switch (error) {
          case 'auth/wrong-password':
            return SignInAuthError.WrongPassword;
            break;
          case 'auth/user-not-found':
            return SignInAuthError.UserNotFound;
            break;
          case 'auth/invalid-email':
            return SignInAuthError.InvalidEmail;
            break;
        }*/
        return false;
      }
    );
  }
}
