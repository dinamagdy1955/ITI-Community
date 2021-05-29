import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  subscribers: string[];
  members: string[];
  admins: string[];
  firstName: string;
  lastName: string;
  avatar: string;
  jobTitle: string;
  data: Observable<any>;
  subscriptions: Subscription[] = [];
  constructor(private db: AngularFirestore, private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.avatar = res.avatar;
        this.jobTitle = res.jobTitle;
      }
    });
    this.subscriptions.push(sub);
  }

  getGroupsUsers(id) {
    return this.db
      .collection('Groups2')
      .doc(id)
      .collection('Users')
      .snapshotChanges();
  }

  getGroups() {
    return this.db.collection('Groups2').snapshotChanges();
  }

  getGrpById(id) {
    return this.db.collection('Groups2').doc(id).valueChanges();
  }

  // getGroupUsers(id) {
  //   return {
  //     admins: this.db.collection('Groups2').doc(id).collection('Admins').snapshotChanges(),
  //     members: this.db.collection('Groups2').doc(id).collection('Members').snapshotChanges(),
  //     subscribers: this.db.collection('Groups2').doc(id).collection('Subscribers').snapshotChanges(),
  //   }
  // }

  sendRequest(user, id) {
    this.db
      .collection('Groups2')
      .doc(id)
      .collection('Users', (ref) => ref.where('__name__', '!=', user))
      .doc(user)
      .set({
        firstName: this.firstName,
        lastName: this.lastName,
        avatar: this.avatar,
        jobTitle: this.jobTitle,
        Role: 0,
      });
  }

  updateMembers(user, id) {
    // let sub = this.db.collection('Groups2').doc(id).collection('Members').doc(user).snapshotChanges().subscribe(res => {
    //   let switcher = res.payload.data();
    //   if (switcher != undefined)
    //     this.db.collection('Groups2').doc(id).collection('Admins', ref => ref.where('__name__', '!=', user)).doc(user).set(switcher)
    //   if (user != undefined) {
    //     sub.unsubscribe()
    //     this.db.collection('Groups2').doc(id).collection('Members', ref => ref.where('__name__', '==', user)).doc(user).delete()
    //   }
    // })
    this.db.collection('Groups2').doc(id).collection('Users').doc(user).update({
      Role: 1,
    });
    this.addGroupToUser(user, id);
  }

  ChangeMembers(user, id) {
    // let sub = this.db.collection('Groups2').doc(id).collection('Admins').doc(user).snapshotChanges().subscribe(res => {
    //   let switcher = res.payload.data();
    //   if (switcher != undefined)
    //     this.db.collection('Groups2').doc(id).collection('Members', ref => ref.where('__name__', '!=', user)).doc(user).set(switcher)
    //   if (user != undefined) {
    //     sub.unsubscribe()
    //     this.db.collection('Groups2').doc(id).collection('Admins', ref => ref.where('__name__', '==', user)).doc(user).delete()
    //   }
    // })
    this.db.collection('Groups2').doc(id).collection('Users').doc(user).update({
      Role: 2,
    });
    this.addGroupToUser(user, id);
  }

  updateRequests(user, id) {
    // let sub = this.db.collection('Groups2').doc(id).collection('Subscribers').doc(user).snapshotChanges().subscribe(res => {
    //   let switcher = res.payload.data();
    //   if (switcher != undefined)
    //     this.db.collection('Groups2').doc(id).collection('Members', ref => ref.where('__name__', '!=', user)).doc(user).set(switcher)
    //   if (user != undefined) {
    //     sub.unsubscribe()
    //     this.db.collection('Groups2').doc(id).collection('Subscribers', ref => ref.where('__name__', '==', user)).doc(user).delete()
    //   }
    // })
    this.db.collection('Groups2').doc(id).collection('Users').doc(user).update({
      Role: 2,
    });
    this.addGroupToUser(user, id);
  }

  changeSub(user, id) {
    // let sub = this.db.collection('Groups2').doc(id).collection('Members').doc(user).snapshotChanges().subscribe(res => {
    //   let switcher = res.payload.data();
    //   if (switcher != undefined)
    //     this.db.collection('Groups2').doc(id).collection('Subscribers', ref => ref.where('__name__', '!=', user)).doc(user).set(switcher)
    //   if (user != undefined) {
    //     sub.unsubscribe()
    //     this.db.collection('Groups2').doc(id).collection('Members', ref => ref.where('__name__', '==', user)).doc(user).delete()
    //   }
    // })
    this.db.collection('Groups2').doc(id).collection('Users').doc(user).update({
      Role: 0,
    });
    this.deleteGroupFromUser(user, id);
  }

  MembersRole(user, id, role) {
    if (role === 1)
      // Admins
      this.updateMembers(user, id);
    else if (role === 2)
      // Admin To Member
      this.ChangeMembers(user, id);
    else if (role === 2)
      // Sub To Member
      this.updateRequests(user, id);
    else if (role === 0)
      // Member To Sub
      this.changeSub(user, id);
    else return;
  }

  DeleteMembers(user, id) {
    this.db
      .collection('Groups2')
      .doc(id)
      .collection('Users', (ref) => ref.where('__name__', '==', user))
      .doc(user)
      .delete();
    this.deleteGroupFromUser(user, id);
  }

  addGroupToUser(user, groupId) {
    let sub = this.us.getUserData(user).subscribe((res) => {
      let Groups = res.payload.get('groups');
      // if (Groups.indexOf(groupId) == -1) {
      //   Groups.push(groupId);
      // }
      sub.unsubscribe();
      this.db.collection('users-details').doc(user).update({
        groups: Groups,
      });
    });
  }

  deleteGroupFromUser(user, groupId) {
    let sub = this.us.getUserData(user).subscribe((res) => {
      let Groups = res.payload.get('groups');
      if (Groups.indexOf(groupId) != -1) {
        Groups.splice(Groups.indexOf(groupId), 1);
      }
      sub.unsubscribe();
      this.db.collection('users-details').doc(user).update({
        groups: Groups,
      });
    });
  }
}
