import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInAuthError } from '../signInInterface/sign-in-auth-error';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private auth: AngularFireAuth) {}

  async signInAuth(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password).then(
      (responce) => {
        console.log(responce);
        localStorage.setItem('userToken', responce['refreshToken']);
        return SignInAuthError.Correct;
      },
      (err) => {
        switch (err) {
          case 'auth/wrong-password':
            return SignInAuthError.WrongPassword;
          case 'auth/user-not-found':
            return SignInAuthError.UserNotFound;
          case 'auth/invalid-email':
            return SignInAuthError.InvalidEmail;
        }
      }
    ).catch();
  }
}
