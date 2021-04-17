import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/Components/login/signInService/user-profile.service';

@Component({
  selector: 'app-profile-body-details',
  templateUrl: './profile-body-details.component.html',
  styleUrls: ['./profile-body-details.component.scss'],
})
export class ProfileBodyDetailsComponent implements OnInit {
  Name: string;
  jobTitle: string;
  constructor(private userProfileData: UserProfileService) {
    this.Name =
      JSON.parse(localStorage.getItem('userData')).firstName +
      ' ' +
      JSON.parse(localStorage.getItem('userData')).lastName;
    this.jobTitle = JSON.parse(localStorage.getItem('userData')).jobTitle;
  }

  ngOnInit() {}
}
