import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupChatService {

  constructor(private db: AngularFirestore) { }

  fetchGroupByUserID(uid) {
    //   const vm = this
    //   return new Promise((resolve, reject) => {
    //     const groupRef = this.db.collection('group', ref=> ref.where('members', 'array-contains', uid)).snapshotChanges().subscribe((querySnapshot) => {
    //        const allGroups = []
    //        querySnapshot.forEach((doc) => {
    //          const data = doc.data()
    //          data.id = doc.id
    //          if (data.recentMessage) allGroups.push(data)
    //        })
    //        vm.groups = allGroups
    //   })
    //    })
    // }
    const vm = this
    return new Promise((res, rej) => {
      const groupRef = this.db.collection('GroupMsg', ref => ref.where('member', 'array-contains', uid)).snapshotChanges();
      groupRef.subscribe(res => {
        const allGroups = res.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as object)
          }
        })
      })
    })
  }
}
