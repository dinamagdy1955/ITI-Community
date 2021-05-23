import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class JobDatabaseService {

  constructor(private db: AngularFirestore) {}
  getJobs() {
    let jobs = [];
    this.db
      .collection('jobs')
      .get()
      .subscribe((res) => {
        res.docs.forEach((doc) => {
          jobs.push({
            id:doc.id,
            data:doc.data()});
        });
      });
    return jobs;
  }
  getJobById(id):any {
    return this.db
      .collection('jobs')
      .doc(id).get()
  }
  jobSearch(name) {
    return this.db
      .collection('jobs', (ref) =>
        ref.where('company.en', '==', name).orderBy('poisition.postedDate', 'desc')
      )
      .snapshotChanges();
  }
  }