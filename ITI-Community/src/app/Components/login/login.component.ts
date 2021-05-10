import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MainServices/User.service';
import { LocalUserData } from 'src/app/ViewModel/local-user-data';
import { SignInAuthError } from './signInInterface/sign-in-auth-error';
import { SignInService } from './signInService/sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;

  constructor(
    private signIn: SignInService,
    private FB: FormBuilder,
    private profile: UserService,
    private router: Router
  ) {
    this.loginUser = this.FB.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{7,}$/),
      ]),
    });
  }

  ngOnInit(): void {}

  SignIn() {
    let r;
    if (this.loginUser.valid)
      this.signIn
        .signInAuth(this.loginUser.value.email, this.loginUser.value.password)
        .then(
          (responce) => {
            if (responce.user.emailVerified) {
              localStorage.setItem('uid', responce.user.uid);
              let sub = this.profile
                .getUserBasic(responce.user.uid)
                .subscribe((res) => {
                  let userProfileBasic = res.payload.data();
                  if (
                    userProfileBasic.isAccepted &&
                    !userProfileBasic.isRemoved
                  ) {
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
                        localStorage.setItem(
                          'avatar',
                          res.payload.data().avatar
                        );
                        localStorage.setItem(
                          'avatarCover',
                          res.payload.data().avatarCover
                        );
                        //for behavioral subject
                        let localUserData: LocalUserData = {
                          id: res.payload.id,
                          firstName: res.payload.data().firstName,
                          lastName: res.payload.data().lastName,
                          jobTitle: res.payload.data().jobTitle,
                          avatar: res.payload.data().avatar,
                          avatarCover: res.payload.data().avatarCover,
                        };
                        this.profile.setlocalUserData(localUserData);
                        /////////////
                        console.log(this.profile.localUserData);
                        this.router.navigate(['/HOME']);
                        return SignInAuthError.Correct;
                      });
                  } else {
                    localStorage.removeItem('uid');
                    alert('user not accepted yet or have been removed');
                  }
                  // sub.unsubscribe();
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
}
