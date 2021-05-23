import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-left-side-group',
  templateUrl: './left-side-group.component.html',
  styleUrls: ['./left-side-group.component.scss'],
})
export class LeftSideGroupComponent implements OnInit {
  userID: string;
  userData;
  firstName: string;
  lastName: string;
  avatar: string;
  jobTitle: string;
  avatarCover: string;
  counter = 0;
  groups: any[] = [];
  constructor(private us: UserService, private gp: GroupService) {}

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.avatar = localStorage.getItem('avatar');
    this.avatarCover = localStorage.getItem('avatarCover');
    this.jobTitle = localStorage.getItem('jobTitle');
    this.us.getUserData(localStorage.getItem('uid')).subscribe((res) => {
      this.counter = 0;
      res.payload.get('groups').map((grp) => {
        if (this.counter < 5)
          this.gp.getGrpById(grp).subscribe((e) => {
            this.groups.push({
              id: grp,
              data: e,
            });
          });
      });
    });
  }
}
