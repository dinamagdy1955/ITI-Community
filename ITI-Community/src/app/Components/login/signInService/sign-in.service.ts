import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { promise } from 'selenium-webdriver';
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
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('userToken') == undefined) return false;
    else return true;
  }
}
