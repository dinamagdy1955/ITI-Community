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

  // ////////////////////////////////////
  getAllUserData() {
    return this.db.collection('users-details').snapshotChanges();
  }

  // notINCard(arr:any[]){
  //   let uid=localStorage.getItem("uid");
  //   arr.push(uid)
  //   return  this.db.collection('users-details' , ref=> ref.where('__name__','not-in',arr)).snapshotChanges()

  // }
  // getAllFriendRequests() {
  //   let uid=localStorage.getItem("uid");

  //   return this.db.collection('users-details').doc(uid).collection('friendRequest').snapshotChanges()

  // }

  getFriendRequests(uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendRequest')
      .snapshotChanges();
  }

  // Ignore friend Request
  ignore(id) {
    let uid = localStorage.getItem('uid');
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendRequest')
      .doc(id)
      .delete();
  }
  notINCard(arr: any[]) {
    let uid = localStorage.getItem('uid');
    arr.push(uid);
    return this.db
      .collection('users-details', (ref) =>
        ref.where('__name__', 'not-in', arr)
      )
      .snapshotChanges();
  }

  // deleteFriend(id){
  //   let uid=localStorage.getItem("uid");
  //   return this.db.collection('users-details').doc(uid).collection('friendList').doc(id).delete()

  // }

  // Accept friend Request
  // AcceptRequest(item){
  //   let uid=localStorage.getItem("uid");
  //   let id =item.id;
  //   item ={
  //     "firstName":item.firstName,
  //     'lastName':item.lastName,
  //     "avatar":item.avatar,
  //     "jobTitle":item.jobTitle,
  //   }
  //   const friend ={
  //     "firstName":this.data.firstName,
  //     'lastName':this.data.lastName,
  //     "avatar":this.data.avatar,
  //     "jobTitle":this.data.jobTitle,
  //   }

  //   this.ignore(id)

  //  this.db.collection('users-details').doc(uid).collection('friendList').doc(id).set({...item});
  //  this.db.collection('users-details').doc(id).collection('friendList').doc(uid).set({...friend})
  //   return
  // }

  // //friendList
  // // getAllFriendsList() {
  // //   let uid=localStorage.getItem("uid");

  // //   return this.db.collection('users-details').doc(uid).collection('friendList').snapshotChanges()
  // // }

  //create request
  create_NewRequest(uid) {
    let data = {
      id: localStorage.getItem('uid'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      jobTitle: localStorage.getItem('jobTitle'),
      avatar: localStorage.getItem('avatar'),
    };
    console.log(data);
    const Request = {
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
      jobTitle: data.jobTitle,
      id: data.id,
      reqState: false,
    };
    this.db
      .collection('users-details')
      .doc(data.id)
      .collection('MySentfriendRequests')
      .doc(uid)
      .set({ uid });
    this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendRequest')
      .doc(data.id)
      .set({ ...Request });
  }

  getMySentfriendRequests() {
    let uid = localStorage.getItem('uid');
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MySentfriendRequests')
      .snapshotChanges();
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
