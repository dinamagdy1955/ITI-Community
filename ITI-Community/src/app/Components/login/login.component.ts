import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  loginErr: SignInAuthError;
  fieldTextType: boolean = false;
  @ViewChild('err') myModal;
  constructor(
    private signIn: SignInService,
    private FB: FormBuilder,
    private profile: UserService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.loginUser = this.FB.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,38}$/),
      ]),
    });
  }

  ngOnInit(): void {}

  openModal() {
    this.modalService.open(this.myModal, { centered: true });
  }

  SignIn() {
    this.loginErr = SignInAuthError.Correct;
    if (this.loginUser.valid) {
      this.signIn
        .signInAuth(this.loginUser.value.email, this.loginUser.value.password)
        .then(
          (responce) => {
            if (responce.user.emailVerified) {
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
                        this.router.navigate(['/Home']);
                        return SignInAuthError.Correct;
                      });
                  } else {
                    this.loginErr = SignInAuthError.UserRemovedOrUnaccepted;
                    this.openModal();
                  }
                  sub.unsubscribe();
                });
            } else {
              this.loginErr = SignInAuthError.EmailNotVerified;
              this.openModal();
            }
          },
          (err) => {
            switch (err) {
              case 'auth/wrong-password':
                this.loginErr = SignInAuthError.WrongPassword;
              case 'auth/user-not-found':
                this.loginErr = SignInAuthError.UserNotFound;
              case 'auth/invalid-email':
                this.loginErr = SignInAuthError.InvalidEmail;
            }
            this.openModal();
          }
        );
    } else this.openModal();
  }
}
