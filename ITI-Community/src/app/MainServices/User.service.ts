import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUserData(uid): Observable<any> {
    return this.db.collection('users-details').doc(uid).snapshotChanges();
  }

  // to call this function for get one user by id
  // import { UserService } from 'src/app/MainServices/User.service';
  // private us: UserService
  // user;
  // let subUser = this.us
  //     .getUserData(localStorage.getItem('uid'))
  //     .subscribe((r) => {
  //       let userData = r.payload;
  //       this.user = {
  //         name: userData.get('firstName') + ' ' + userData.get('lastName'),
  //         jobTitle: userData.get('jobTitle'),
  //       };
  //       console.log(this.user);
  //       subUser.unsubscribe();
  //     });

  //this code for get users data by giving it array of users ids

  // let usersData = [];
  // userids.map((user) => {
  //   let sub = this.getUserData(user).subscribe((u) => {
  //     let ud = u.payload;
  //     usersData.push({
  //       name: ud.get('firstName') + ' ' + ud.get('lastName'),
  //       jobTitle: ud.get('jobTitle'),
  //     });
  //     sub.unsubscribe();
  //   });
  // });
}
