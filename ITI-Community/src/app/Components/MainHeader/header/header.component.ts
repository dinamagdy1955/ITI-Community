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
    localStorage.removeItem('userData');
    this.router.navigate(['/Login']);
  }
}
