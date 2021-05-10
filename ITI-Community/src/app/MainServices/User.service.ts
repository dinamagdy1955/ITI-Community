import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { LocalUserData } from '../ViewModel/local-user-data';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public localUserData = new Subject<LocalUserData>();
  data = {
    id: localStorage.getItem('uid'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    jobTitle: localStorage.getItem('jobTitle'),
    avatar: localStorage.getItem('avatar'),
  };
  constructor(private db: AngularFirestore) {}

  setlocalUserData(value) {
    this.localUserData.next(value);
  }
 getUserData(uid): Observable<any> {
    return this.db.collection('users-details').doc(uid).snapshotChanges();
  }


getAllUserData() {
  return this.db.collection('users-details').snapshotChanges();
}




getMySentfriendRequests(){
  let uid=localStorage.getItem("uid");
return this.db.collection('users-details').doc(uid).collection('MySentfriendRequests').snapshotChanges()
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
