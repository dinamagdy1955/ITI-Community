import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-request-group-page',
  templateUrl: './request-group-page.component.html',
  styleUrls: ['./request-group-page.component.scss'],
})
export class RequestGroupPageComponent implements OnInit, OnDestroy {
  GroupList;
  GroupList2;
  userID: string;
  subscribers;
  users = [];
  subscription: Subscription[] = [];
  constructor(private GrpServ: GroupService) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
    this.GroupList = [];

    let sub1 = this.GrpServ.getGroups().subscribe((res) => {
      this.GroupList2 = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        };
      });
      sub1.unsubscribe();
      this.subscribers = [];
      this.GroupList = [];
      this.users = [];
      for (let i of this.GroupList2) {
        let sub = this.GrpServ.getGroupsUsers(i.id).subscribe((res) => {
          this.users = res.map((e) => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            };
          });
          console.log('ul', this.users);
          console.log('beforegl', this.GroupList);
          console.log('beforesl', this.subscribers);
          if (this.users.length == 0) {
            this.GroupList = this.GroupList.filter((ele) => ele.id != i.id);
            this.subscribers = this.subscribers.filter((ele) => ele.id != i.id);
          } else
            for (let u of this.users) {
              if (u.id == this.userID && u.Role > 0) {
                this.GroupList.push(i);
              } else if (u.id == this.userID && u.Role == 0) {
                this.subscribers.push(i);
              } else if (u.id == this.userID && u.Role == undefined) {
                console.log('rmv');
                this.GroupList = this.GroupList.filter((ele) => ele.id != i.id);
                this.subscribers = this.subscribers.filter(
                  (ele) => ele.id != i.id
                );
              }
            }
        });
        this.subscription.push(sub);
      }
    });
    this.subscription.push(sub1);
  }

  leaveGroup(user, id) {
    this.GrpServ.DeleteMembers(user, id);
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
