import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/Components/login/signInService/user-profile.service';

@Component({
  selector: 'app-profile-body-about',
  templateUrl: './profile-body-about.component.html',
  styleUrls: ['./profile-body-about.component.scss'],
})
export class ProfileBodyAboutComponent implements OnInit {
  about: string;
  constructor() {
    this.about = JSON.parse(localStorage.getItem('userData')).about;
  }

  ngOnInit() {}
}
