import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private db: AngularFirestore) {}

  notINCard(arr: any[], uid) {
    arr.push(uid);
    return this.db
      .collection('users-details', (ref) =>
        ref.where('__name__', 'not-in', arr)
      )
      .snapshotChanges();
  }

  notINCardRequests(arr: any[], uid) {
    arr.push(uid);
    return this.db
      .collection('users-details', (ref) =>
        ref.where('__name__', 'not-in', arr)
      )
      .snapshotChanges();
  }

  getAllFriendRequests(uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendRequest')
      .snapshotChanges();
  }

  // Ignore friend Request
  ignore(id, uid) {
    this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendRequest')
      .doc(id)
      .delete();
    this.db
      .collection('users-details')
      .doc(id)
      .collection('MySentfriendRequests')
      .doc(uid)
      .delete();
  }

  deleteFriend(id, uid) {
    this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendList')
      .doc(id)
      .delete();
    this.db
      .collection('users-details')
      .doc(id)
      .collection('friendList')
      .doc(uid)
      .delete();
    return;
  }

  deleteSentFriendReq(req, uid) {
    this.db
      .collection('users-details')
      .doc(uid)
      .collection('MySentfriendRequests')
      .doc(req.id)
      .delete();
    this.db
      .collection('users-details')
      .doc(req.id)
      .collection('friendRequest')
      .doc(uid)
      .delete();
    return;
  }

  // deleteInvitation(invit) {
  //   let uid = localStorage.getItem('uid');
  //   this.db
  //     .collection('users-details')
  //     .doc(uid)
  //     .collection('friendRequest')
  //     .doc(invit.id)
  //     .delete();
  //   this.db
  //     .collection('users-details')
  //     .doc(invit.id)
  //     .collection('MySentfriendRequests')
  //     .doc(uid)
  //     .delete();
  //   return;
  // }

  // Accept friend Request
  AcceptRequest(item, uid, user) {
    let id = item.id;
    user.addedDate = new Date();
    item = {
      firstName: item.firstName,
      lastName: item.lastName,
      avatar: item.avatar,
      avatarCover: item.avatarCover,
      jobTitle: item.jobTitle,
      addedDate: new Date(),
    };
    this.ignore(id, uid);
    this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendList')
      .doc(id)
      .set({ ...item });
    this.db
      .collection('users-details')
      .doc(id)
      .collection('friendList')
      .doc(uid)
      .set({ ...user });
      // this.db.collection('users-details').doc(user).collection('Notifications')
      // .doc(id).set(post)


      
  }

  //friendList
  getAllFriendsList(uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('friendList')
      .snapshotChanges();
  }

  //create request
  create_NewRequest(user, userData) {
    user.addedDate = new Date();
    const Request = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatar: userData.avatar,
      avatarCover: userData.avatarCover,
      jobTitle: userData.jobTitle,
      id: userData.id,
      reqState: false,
      addedDate: new Date(),
    };
    this.db
      .collection('users-details')
      .doc(userData.id)
      .collection('MySentfriendRequests')
      .doc(user.id)
      .set(user);
    this.db
      .collection('users-details')
      .doc(user.id)
      .collection('friendRequest')
      .doc(userData.id)
      .set({ ...Request });
  }

  getMySentfriendRequests(uid) {
    return this.db
      .collection('users-details')
      .doc(uid)
      .collection('MySentfriendRequests')
      .snapshotChanges();
  }
}
