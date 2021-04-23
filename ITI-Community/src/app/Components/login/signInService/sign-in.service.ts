import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SignInAuthError } from '../signInInterface/sign-in-auth-error';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  isloggedIn: boolean;
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private profile: UserProfileService
  ) {
    this.isloggedIn = this.isLoggedIn();
    if (this.isloggedIn == true) {
      this.router.navigate(['/HOME']);
    }
  }

  async signInAuth(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password).then(
      (responce) => {
        if (responce.user.emailVerified) {
          console.log(responce);
          localStorage.setItem('uid', responce.user.uid);
          this.profile.getProfileData();
          let userProfile = JSON.parse(localStorage.getItem('userData'));
          console.log(userProfile);
          if (userProfile.isAccepted && !userProfile.isRemoved) {
            localStorage.setItem('userToken', responce.user.refreshToken);
            this.router.navigate(['/HOME']);
            return SignInAuthError.Correct;
          } else {
            alert('user not accepted yet or have been removed');
          }
        }
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
    );
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('userToken') == undefined) return false;
    else return true;
  }
}
