import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private db: AngularFirestore, private router: Router) { }


  getChats() {
    return this.db.collection('Masseges').snapshotChanges();
  }

  getMasseges(id) {
    return this.db.collection('Masseges').doc(id).collection('masseges', ref => ref.limit(20).orderBy('sentAt', 'asc')).snapshotChanges();
  }

  getRoom(id) {
    return this.db.collection('Masseges').doc(id).snapshotChanges()
  }

  fullDeleteRoom(id) {
    return this.db.collection('Masseges').doc(id).delete()
  }

  filtration(data, loggedData, recData) {
    data = data.filter(e => {
      let user1 = e.User1
      let user2 = e.User2
      if ((user1.id == loggedData && user2.id == recData) || (user1.id == recData && user2.id == loggedData)) {
        return e
      }
    })
    return data;
  }

  newChat(loggedData, recData) {
    let data = [];
    let sub = this.getChats().subscribe((res) => {
      data = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        }
      })
      data = this.filtration(data, loggedData.id, recData.id)

      sub.unsubscribe();
      if (data.length > 0) {
        let id = data[0].id
        if (loggedData.id == data[0].User1.id) {
          return this.db.collection('Masseges').doc(id).update({
            User1: {
              firstName: loggedData.firstName,
              lastName: loggedData.lastName,
              avatar: loggedData.avatar,
              isDeleted: false,
              id: loggedData.id
            }
          }).then(e => {
            this.router.navigate([`/Messages/all-messages/${id}`])

          })
        } else if (loggedData.id == data[0].User2.id) {
          return this.db.collection('Masseges').doc(id).update({
            User2: {
              firstName: loggedData.firstName,
              lastName: loggedData.lastName,
              avatar: loggedData.avatar,
              isDeleted: false,
              id: loggedData.id
            }
          }).then(e => {
            this.router.navigate([`/Messages/all-messages/${id}`])
          })
        }
      } else {
        return this.db.collection('Masseges').add({
          User1: {
            firstName: loggedData.firstName,
            lastName: loggedData.lastName,
            avatar: loggedData.avatar,
            isDeleted: false,
            id: loggedData.id
          },
          User2: {
            firstName: recData.firstName,
            lastName: recData.lastName,
            avatar: recData.avatar,
            isDeleted: false,
            id: recData.id
          }
        }).then(e => {
          this.router.navigate([`/Messages/all-messages/${e.id}`])
        })
      }

    })
  }



  sendMsg(cid, sendBy, body) {
    return this.db.collection('Masseges').doc(cid).collection('masseges').add({
      sendBy: sendBy,
      Body: body,
      sentAt: new Date()
    })
  }

  deleteRoom(id, uid) {
    let user1
    let user2
    let check1;
    let check2;
    let sub = this.getRoom(id).subscribe(res => {
      user1 = res.payload.data()['User1']
      user2 = res.payload.data()['User2']
      check1 = res.payload.data()['User1'].isDeleted
      check2 = res.payload.data()['User2'].isDeleted
      sub.unsubscribe()
      if ((user1.id == uid && check2) || (user2.id == uid && check1)) {
        this.fullDeleteRoom(id)
      } else if (user1.id == uid && !check2) {
        user1.isDeleted = true
        return this.db.collection('Masseges').doc(id).update({
          User1: user1
        })
      } else if (user2.id == uid && !check1) {
        user2.isDeleted = true
        return this.db.collection('Masseges').doc(id).update({
          User2: user2
        })
      }
    })

  }

}
