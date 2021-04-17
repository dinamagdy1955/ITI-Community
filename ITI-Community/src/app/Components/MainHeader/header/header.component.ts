import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../login/signInService/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleStatus: boolean = false;
  constructor(
    private router: Router,
    private userProfile: UserProfileService
  ) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleStatus = !this.toggleStatus;
  }
  signOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('uid');
    this.userProfile.existUserData = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      about: '',
      branch: -1,
      track: -1,
      experiences: [],
      friendList: [],
    };
    localStorage.removeItem('userData');
    this.router.navigate(['/Login']);
  }
}
