import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../profile/Service/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleStatus: boolean = false;
  public isMenuCollapsed = true;
  uid = localStorage.getItem('uid');
  firstName: string = localStorage.getItem('firstName');
  lastName: string = localStorage.getItem('lastName');
  jobTitle: string = localStorage.getItem('jobTitle');
  avatar: string = localStorage.getItem('avatar');

  constructor(
    private router: Router,
    private userProfile: UserProfileService
  ) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleStatus = !this.toggleStatus;
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
}
