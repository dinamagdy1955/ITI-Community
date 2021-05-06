import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../ViewModel/ipost';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  singleGroup
  subscribers: string[]
  members: string[]
  admins: string[]


  constructor(private db: AngularFirestore) { }

  getGroups() {
    return this.db.collection('Groups2').snapshotChanges();
  }

  getGrpById(id) {
    return this.db.collection('Groups').doc(id).valueChanges();
  }

  getGroupUsers(id) {
    return {
      admins: this.db.collection('Groups2').doc(id).collection('Admins').snapshotChanges(),
      members: this.db.collection('Groups2').doc(id).collection('Members').snapshotChanges(),
      subscribers: this.db.collection('Groups2').doc(id).collection('Subscribers').snapshotChanges(),
    }
  }

  sendRequest(user, id) {
    this.db.collection('Groups2').doc(id).collection('Subscribers', ref => ref.where('__name__', '!=', user)).doc(user).set({
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      avatar: localStorage.getItem('avatar'),
      jobTitle: localStorage.getItem('jobTitle'),
    })
  }

  DeleteRequest(user, id) {
    this.db.collection('Groups2').doc(id).collection('Subscribers', ref => ref.where('__name__', '==', user)).doc(user).delete()
  }

  leaveGroup(user, id) {
    this.db.collection('Groups2').doc(id).collection('Members', ref => ref.where('__name__', '==', user)).doc(user).delete()
  }


















































  getAllGroups() {
    return this.db.collection('Groups').snapshotChanges();
  }




  updateRequests(user, id) {
    this.subscribers = []
    this.members = []
    let sub = this.getGrpById(id).subscribe((res) => {
      this.singleGroup = res
      this.subscribers = this.singleGroup.subscriber
      this.members = this.singleGroup.members
      if (this.singleGroup.subscriber.includes(user)) {
        this.subscribers.splice(this.subscribers.indexOf(user), 1)
        this.members.push(user)
      } else if (this.singleGroup.members.includes(user)) {
        this.members.splice(this.members.indexOf(user), 1)
        this.subscribers.push(user)
      }
      sub.unsubscribe();
      this.db.collection('Groups').doc(id).update({
        subscriber: this.subscribers,
        members: this.members
      })
    })
  }

  updateMembers(user, id) {
    this.members = []
    this.admins = []
    let sub = this.getGrpById(id).subscribe((res) => {
      this.singleGroup = res
      this.admins = this.singleGroup.admin
      this.members = this.singleGroup.members
      if (this.singleGroup.admin.includes(user)) {
        this.admins.splice(this.admins.indexOf(user), 1)
        this.members.push(user)
      } else if (this.singleGroup.members.includes(user)) {
        this.members.splice(this.members.indexOf(user), 1)
        this.admins.push(user)
      }
      sub.unsubscribe();
      this.db.collection('Groups').doc(id).update({
        admin: this.admins,
        members: this.members
      })
    })
  }

  DeleteMembers(user, id) {
    this.members = []
    this.admins = []
    this.subscribers = []
    let sub = this.getGrpById(id).subscribe((res) => {
      this.singleGroup = res
      this.admins = this.singleGroup.admin
      this.members = this.singleGroup.members
      this.subscribers = this.singleGroup.subscriber
      if (this.singleGroup.admin.includes(user)) {
        this.admins.splice(this.admins.indexOf(user), 1)
      } else if (this.singleGroup.members.includes(user)) {
        this.members.splice(this.members.indexOf(user), 1)
      } else if (this.singleGroup.subscriber.includes(user)) {
        this.subscribers.splice(this.subscribers.indexOf(user), 1)
      }
      sub.unsubscribe();
      this.db.collection('Groups').doc(id).update({
        admin: this.admins,
        members: this.members,
        subscriber: this.subscribers
      })
    })
  }

}
