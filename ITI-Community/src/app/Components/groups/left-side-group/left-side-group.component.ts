import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-left-side-group',
  templateUrl: './left-side-group.component.html',
  styleUrls: ['./left-side-group.component.scss']
})
export class LeftSideGroupComponent implements OnInit {
  userID: string
  userData
  firstName: string
  lastName: string
  avatar: string
  jobTitle: string
  constructor() {

  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
    this.firstName = localStorage.getItem('firstName')
    this.lastName = localStorage.getItem('lastName')
    this.avatar = localStorage.getItem('avatar')
    this.jobTitle = localStorage.getItem('jobTitle')

  }


}
