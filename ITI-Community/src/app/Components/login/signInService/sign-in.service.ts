import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MainServices/User.service';
import { LocalUserData } from 'src/app/ViewModel/local-user-data';
import { SignInAuthError } from '../signInInterface/sign-in-auth-error';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  isloggedIn: boolean;
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private profile: UserService
  ) {
    this.isloggedIn = this.isLoggedIn();
    if (this.isloggedIn == true) {
      this.router.navigate(['/HOME']);
    }
  }

  signInAuth(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (responce) => {
        if (responce.user.emailVerified) {
          console.log(responce);
          localStorage.setItem('uid', responce.user.uid);
          let sub = this.profile
            .getUserBasic(responce.user.uid)
            .subscribe((res) => {
              let userProfileBasic = res.payload.data();
              if (userProfileBasic.isAccepted && !userProfileBasic.isRemoved) {
                let sub2 = this.profile
                  .getUserData(responce.user.uid)
                  .subscribe((res) => {
                    sub2.unsubscribe();
                    localStorage.setItem(
                      'userToken',
                      responce.user.refreshToken
                    );
                    localStorage.setItem(
                      'firstName',
                      res.payload.data().firstName
                    );
                    localStorage.setItem(
                      'lastName',
                      res.payload.data().lastName
                    );
                    localStorage.setItem(
                      'jobTitle',
                      res.payload.data().jobTitle
                    );
                    localStorage.setItem('avatar', res.payload.data().avatar);
                    localStorage.setItem(
                      'avatarCover',
                      res.payload.data().avatarCover
                    );
                    let localUserData: LocalUserData = {
                      id: res.payload.id,
                      firstName: res.payload.data().firstName,
                      lastName: res.payload.data().lastName,
                      jobTitle: res.payload.data().jobTitle,
                      avatar: res.payload.data().avatar,
                      avatarCover: res.payload.data().avatarCover,
                    };
                    this.profile.setlocalUserData(localUserData);
                    this.router.navigate(['/HOME']);
                    return SignInAuthError.Correct;
                  });
              } else {
                localStorage.removeItem('uid');
                alert('user not accepted yet or have been removed');
              }
              sub.unsubscribe();
            });
        } else {
          return SignInAuthError.EmailNotVerified;
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
