import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUserProfileData } from '../../profile/profile-body/ViewModels/iuser-profile-data';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  existUserBasics;
  existUserDetails;
  existUserData: IUserProfileData = {
    isPeople: true,
    isAccepted: false,
    isRemoved: false,
    isReported: false,
    reports: [],
    firstName: '',
    lastName: '',
    jobTitle: '',
    about: '',
    branch: -1,
    track: -1,
    experiences: [],
    friendList: [],
  };
  constructor(private db: AngularFirestore) {}

  async getProfileData() {
    let uid = localStorage.getItem('uid');
    console.log(uid);

    await this.db
      .collection('users-basics')
      .doc(uid)
      .get()
      .subscribe((doc) => {
        this.existUserBasics = doc.data();
        this.existUserData.isPeople = this.existUserBasics.isPeople;
        this.existUserData.isAccepted = this.existUserBasics.isAccepted;
        this.existUserData.isRemoved = this.existUserBasics.isRemoved;
        this.existUserData.isReported = this.existUserBasics.isReported;
        this.existUserData.reports = this.existUserBasics.reports;
      });
    await this.db
      .collection('users-details')
      .doc(uid)
      .get()
      .subscribe((doc) => {
        this.existUserDetails = doc.data();
        this.existUserData.firstName = this.existUserDetails.firstName;
        this.existUserData.lastName = this.existUserDetails.lastName;
        this.existUserData.branch = this.existUserDetails.branch;
        this.existUserData.track = this.existUserDetails.track;
        this.existUserData.about = this.existUserDetails.about;
        this.existUserData.jobTitle = this.existUserDetails.jobTitle;
        this.existUserData.experiences = this.existUserDetails.experiences;
        this.existUserData.friendList = this.existUserDetails.friendList;
        localStorage.setItem('userData', JSON.stringify(this.existUserData));
        //console.log(localStorage.getItem('userData'));
      });
  }
}
