import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserBasics } from '../Components/registration/ViewModels/iuser-basics';
import { IUserDetails } from '../Components/registration/ViewModels/iuser-details';
import { LocalUserData } from '../ViewModel/local-user-data';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public localUserData = new BehaviorSubject<LocalUserData>(null);

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.stateObs();
  }
  // ngOnInit(): void {}

  Init() {
    return new Promise<void>((resolve, reject) => {
      this.stateObs();
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  stateObs() {
    this.auth.onAuthStateChanged((res) => {
      if (res != null || res != undefined) {
        this.db
          .collection('users-details')
          .doc(res.uid)
          .snapshotChanges()
          .subscribe((res) => {
            console.log('AppInitService.init() called');
            this.setlocalUserData({
              id: res.payload.id,
              firstName: res.payload.data()['firstName'],
              lastName: res.payload.data()['lastName'],
              jobTitle: res.payload.data()['jobTitle'],
              avatar: res.payload.data()['avatar'],
              avatarCover: res.payload.data()['avatarCover'],
            });
          });
      } else {
        this.localUserData.next(null);
      }
    });
    console.log(this.localUserData.value);
  }

  setlocalUserData(value) {
    this.localUserData.next(value);
  }
  getUserData(uid): Observable<any> {
    return this.db.collection('users-details').doc(uid).snapshotChanges();
  }

  getAllUsersData(): Observable<any> {
    return this.db.collection('users-details').snapshotChanges();
  }

  getUserBasic(uid): Observable<any> {
    return this.db.collection('users-basics').doc(uid).snapshotChanges();
  }

  getUserDataList(arr): Observable<any> {
    return this.db
      .collection('users-details', (ref) => ref.where('__name__', 'in', arr))
      .get();
  }

  saveInDB(uid, NewUserBasic: IUserBasics, newUserDetails: IUserDetails) {
    this.db.collection('users-basics').doc(uid).set(NewUserBasic);
    this.db.collection('users-details').doc(uid).set(newUserDetails);
  }

  editPassword(email, password) {
    this.db
      .collection('users-basics', (ref) => ref.where('email', '==', email))
      .doc()
      .update({ password: password });
  }

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
  /*
  // updateDoc(_id: string, _value: string) {
  //   let doc = this.db.collection('users-details', ref => ref.where('id', '==', _id));
  //   doc.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {                                                      
  //       const data = a.payload.doc.data();
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))).subscribe((_doc: any) => {
  //      let id = _doc[0].payload.doc.id; //first result of query [0]
  //      this.db.doc(`users-details/${id}`).update({rating: _value});
  //     })
  // }
*/
}
