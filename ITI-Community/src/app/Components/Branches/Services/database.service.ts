import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class BranchDatabaseService {
  constructor(private db: AngularFirestore) {}
  getBranches() {
    let branches = [];
    this.db
      .collection('Branches')
      .get()
      .subscribe((res) => {
        res.docs.forEach((doc) => {
          branches.push({
            id:doc.id,
            data:doc.data()});
        });
      });
    return branches;
  }
  getBrancheById(id):any {
    return this.db
      .collection('Branches')
      .doc(id).get()
  }

}
