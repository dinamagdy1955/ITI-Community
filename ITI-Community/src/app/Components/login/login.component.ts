import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignInAuthError } from './signInInterface/sign-in-auth-error';
import { SignInService } from './signInService/sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;
  constructor(private signIn: SignInService, private FB: FormBuilder) {
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
      r = this.signIn.signInAuth(
        this.loginUser.value.email,
        this.loginUser.value.password
      );
    console.log(r);
  }
}
