import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../login/signInService/user-profile.service';
import { IUserProfileData } from './ViewModels/iuser-profile-data';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.scss'],
})
export class ProfileBodyComponent implements OnInit {
  userData: IUserProfileData;
  constructor() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit() {}
}
