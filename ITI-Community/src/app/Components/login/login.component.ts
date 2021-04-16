import { Component, OnInit } from '@angular/core';
import { SignInAuthError } from './signInInterface/sign-in-auth-error';
import { SignInService } from './signInService/sign-in.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailSignIn: string = '';
  passwordSignIn: string = '';
  constructor(private signIn: SignInService) {}

  ngOnInit(): void {}

  SignIn() {
    console.log(this.signIn.signInAuth(this.emailSignIn, this.passwordSignIn));
  }
}
