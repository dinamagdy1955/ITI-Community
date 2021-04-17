import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SignInAuthError } from '../../login/signInInterface/sign-in-auth-error';
import { IUserBasics } from '../ViewModels/iuser-basics';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private auth: AngularFireAuth, private db:AngularFirestore) {}

  async registerNewUser(NewUser:IUserBasics) {
    let result ;
    await this.auth.createUserWithEmailAndPassword(NewUser.email,NewUser.password).then(
      (responce) => {
        let uid = responce.user.uid;
        console.log(uid);
        this.db.collection("users-basics").doc(uid).set(NewUser);
        return SignInAuthError.Correct;
        //result = 'auth/correct';
      })
      .catch((error)=>{
        result = error.code;
        switch (error.code) {
          case 'auth/wrong-password':
            console.log(1);
            return SignInAuthError.WrongPassword;
          case 'auth/user-not-found':
            console.log(2);
            return SignInAuthError.UserNotFound;
          case 'auth/invalid-email':
            console.log(3);
            return SignInAuthError.InvalidEmail;
        }
        
      }
    );
    /*(result)=>{
      switch (result) {
        case 'auth/wrong-password':
          return SignInAuthError.WrongPassword;
        case 'auth/user-not-found':
          return SignInAuthError.UserNotFound;
        case 'auth/invalid-email':
          return SignInAuthError.InvalidEmail;
      }
    }*/
    
  }
}

