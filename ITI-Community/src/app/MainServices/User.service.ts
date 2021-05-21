import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserBasics } from '../Components/registration/ViewModels/iuser-basics';
import { IUserDetails } from '../Components/registration/ViewModels/iuser-details';
import { LocalUserData } from '../ViewModel/local-user-data';
@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  public localUserData = new BehaviorSubject<LocalUserData>(undefined);

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}
  ngOnInit(): void {}

  Init() {
    return new Promise<void>((resolve, reject) => {
      // localStorage.clear();
      this.auth.authState.subscribe((res) => {
        // console.log('state', res);
        if (res != null || res != undefined) {
          // console.log('have user token');
          // localStorage.setItem('userToken', res.refreshToken);
          this.db
            .collection('users-details')
            .doc(res.uid)
            .snapshotChanges()
            .subscribe((res) => {
              // console.log('AppInitService.init() called');
              this.localUserData = new BehaviorSubject<LocalUserData>({
                id: res.payload.id,
                firstName: res.payload.data()['firstName'],
                lastName: res.payload.data()['lastName'],
                jobTitle: res.payload.data()['jobTitle'],
                avatar: res.payload.data()['avatar'],
                avatarCover: res.payload.data()['avatarCover'],
              });
            });
        } else {
          // console.log('not have user token');
          // console.log(this.localUserData.value);
          // localStorage.clear();
          this.localUserData.complete();
          // this.setlocalUserData(undefined);
        }
      });
      setTimeout(() => {
        resolve();
      }, 2000);
    });
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
