import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private db: AngularFirestore) { }

  getAllGroups() {
    return this.db.collection('Groups').snapshotChanges();
  }

  getGrpById(id) {
    return this.db.collection('Groups').doc(id).valueChanges();
  }

}
