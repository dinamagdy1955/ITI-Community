import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInAuthError } from '../signInInterface/sign-in-auth-error';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private auth: AngularFireAuth) {}

  signInAuth(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (responce) => {
        localStorage.setItem('userToken', responce['refreshToken']);
        return true;
      },
      (err) => {
        /*switch (err) {
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
