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
getAppliedJobs(userId){
  return this.db.collection('users-details').doc(userId).collection('appliedJobs').snapshotChanges()
}
  getJobById(id):any {
    return this.db
      .collection('jobs')
      .doc(id).get()
  }

  search(company,location,position){
    if(company!=null&&location==null&&position==null)
    {
      return this.db
      .collection('jobs', (ref) =>
        ref.where('company.en', '==', company).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
    }
    else if (company==null&&location!=null&&position==null)
    {
      return this.db
      .collection('jobs', (ref) =>
        ref.where('location.en', '==', location).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
    }
    else if (company==null&&location==null&&position!=null)
    {
      return this.db
      .collection('jobs', (ref) =>
        ref.where('position.en', '==', position).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
    }

  }

favourite (userId,jobId,job){
  this.db.collection('users-details').doc(userId).collection('savedJobs').doc(jobId).set(job);
  }
  Apply(userId,jobId,job,user){
    this.db.collection('users-details').doc(userId).collection('appliedJobs').doc(jobId).set(job);
    this.db.collection('jobs').doc(jobId).collection('appliedUsers').doc(userId).set(user);
    

}
/* getUser(userId)
{
  return this.db.collection('users-details').doc(userId).snapshotChanges();

} */
getFavorite(userId){
  return this.db.collection('users-details').doc(userId).collection('savedJobs').snapshotChanges();
}
deleteFavorite(jobId,userId){
  return this.db.collection('users-details').doc(userId).collection('savedJobs').doc(jobId).delete();
}
}
/*   Location_Company(l,c){
    
    return this.db
      .collection('jobs', (ref) =>
        ref.where('location.en', '==', l ).where('company.en','==' ,c).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  Location_Job(l,j){
    
    return this.db
      .collection('jobs', (ref) =>
        ref.where('location.en', '==', l).where('position.en','==' ,j).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }
  Job_Company(j,c){
    
    return this.db
      .collection('jobs', (ref) =>
        ref.where('position.en', '==', j).where('company.en','==' ,c).orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
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

  } */