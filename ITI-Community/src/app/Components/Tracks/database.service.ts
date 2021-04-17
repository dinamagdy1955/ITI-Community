import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrackDatabaseService {
  constructor(private db: AngularFirestore) {}
  getTracksData() {
    let tracks = [];
    this.db
      .collection('Tracks')
      .get()
      .subscribe((res) => {
        res.docs.forEach((doc) => {
          tracks.push(doc.data());
        });
      });
    return tracks;
  }
  getScholarshipDurations() {
    let durations = [];
    this.db
      .collection('ScholarshipDurations')
      .get()
      .subscribe((res) => {
        res.docs.forEach((doc) => {
          durations.push(doc.data());
        });
      });
    return durations;
  }
}
