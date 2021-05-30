import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class JobDatabaseService {
  constructor(private db: AngularFirestore) {}
  getJobs() {
    return this.db.collection('jobs').snapshotChanges();
  }
  getAppliedJobs(userId) {
    return this.db
      .collection('users-details')
      .doc(userId)
      .collection('appliedJobs')
      .snapshotChanges();
  }
  getJobById(id): any {
    return this.db.collection('jobs').doc(id).snapshotChanges();
  }
  Company(name) {
    return this.db
      .collection('jobs', (ref) =>
        ref.where('company.en', '==', name).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  Job(name) {
    return this.db
      .collection('jobs', (ref) =>
        ref.where('position.en', '==', name).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  Location(name) {
    return this.db
      .collection('jobs', (ref) =>
        ref.where('location.en', '==', name).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  Location_Company(l, c) {
    return this.db
      .collection('jobs', (ref) =>
        ref
          .where('location.en', '==', l)
          .where('company.en', '==', c)
          .orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  Location_Job(l, j) {
    return this.db
      .collection('jobs', (ref) =>
        ref
          .where('location.en', '==', l)
          .where('position.en', '==', j)
          .orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  Job_Company(j, c) {
    return this.db
      .collection('jobs', (ref) =>
        ref
          .where('position.en', '==', j)
          .where('company.en', '==', c)
          .orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  favourite(userId, jobId, job) {
    this.db
      .collection('users-details')
      .doc(userId)
      .collection('savedJobs')
      .doc(jobId)
      .set(job);
  }
  Apply(userId, jobId, job, user) {
    this.db
      .collection('users-details')
      .doc(userId)
      .collection('appliedJobs')
      .doc(jobId)
      .set(job);
    this.db
      .collection('jobs')
      .doc(jobId)
      .collection('appliedUsers')
      .doc(userId)
      .set(user);
  }
  getFavorite(userId) {
    return this.db
      .collection('users-details')
      .doc(userId)
      .collection('savedJobs')
      .snapshotChanges();
  }
  deleteFavorite(jobId, userId) {
    return this.db
      .collection('users-details')
      .doc(userId)
      .collection('savedJobs')
      .doc(jobId)
      .delete();
  }
}
