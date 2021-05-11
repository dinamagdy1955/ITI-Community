import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  subscribers: string[]
  members: string[]
  admins: string[]

  constructor(private db: AngularFirestore) { }


  getGroupsUsers(id) {
    return this.db.collection('Groups2').doc(id).collection('Users').snapshotChanges();
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
    this.db.collection('Groups2').doc(id).collection('Users', ref => ref.where('__name__', '!=', user)).doc(user).set({
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      avatar: localStorage.getItem('avatar'),
      jobTitle: localStorage.getItem('jobTitle'),
      Role: 0
    })
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
      Role: 1
    })
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
      Role: 2
    })
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
      Role: 2
    })
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
      Role: 0
    })
  }

  MembersRole(user, id, role) {
    if (role === 1) // Admins
      this.updateMembers(user, id)
    else if (role === 2) // Admin To Member
      this.ChangeMembers(user, id)
    else if (role === 2) // Sub To Member
      this.updateRequests(user, id)
    else if (role === 0) // Member To Sub
      this.changeSub(user, id)
    else
      return
  }

  DeleteMembers(user, id) {
    this.db.collection('Groups2').doc(id).collection('Users', ref => ref.where('__name__', '==', user)).doc(user).delete()
  }
}
