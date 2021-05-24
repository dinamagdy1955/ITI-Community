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
  constructor(private auth: AngularFireAuth, private router: Router) {}

  signInAuth(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('userToken') == undefined) return false;
    else return true;
  }

  async logout() {
    await this.auth.signOut().then(() => {
      localStorage.removeItem('userToken');
      this.router.navigate(['/Login']);
    });
  }

  forgetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  resetPassword(code, password) {
    return this.auth.confirmPasswordReset(code, password);
  }

  applyActionCode(code) {
    return this.auth.verifyPasswordResetCode(code);
  }
}
