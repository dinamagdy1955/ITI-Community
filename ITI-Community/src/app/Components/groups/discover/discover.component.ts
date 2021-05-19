import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  GroupList;
  GroupList2;
  userID: string;
  allUsers = [];
  subscription: Subscription[] = [];
  constructor(private groupService: GroupService) { }
  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
    this.GroupList = [];
    let sub1 = this.groupService.getGroups().subscribe((res) => {
      this.GroupList2 = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        };
      });
      this.GroupList = [];
      for (let i of this.GroupList2) {
        let sub = this.groupService.getGroupsUsers(i.id).subscribe((res) => {
          this.allUsers = [];
          // this.GroupList = [];
          this.allUsers = res.map((e) => e.payload.doc.id);
          if (!this.allUsers.includes(this.userID)) {
            this.GroupList.push(i);
          } else {
            this.GroupList = this.GroupList.filter((ele) => ele.id != i.id);
          }
        });
        this.subscription.push(sub);
      }
    });
    this.subscription.push(sub1)
  }

  sendRequest(user, id) {
    this.groupService.sendRequest(user, id);
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
