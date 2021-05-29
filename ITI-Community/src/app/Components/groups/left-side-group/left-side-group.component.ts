import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  data: Observable<any>;
  subscription: Subscription[] = [];
  Lang: string
  constructor(private us: UserService, private gp: GroupService) { }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang')
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.avatar = res.avatar;
        this.jobTitle = res.jobTitle;
        this.avatarCover = res.avatarCover;
      }
    });
    this.subscription.push(sub);

    this.us.getUserData(this.userID).subscribe((res) => {
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
