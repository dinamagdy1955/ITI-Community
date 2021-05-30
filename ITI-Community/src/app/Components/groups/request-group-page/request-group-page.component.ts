import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-request-group-page',
  templateUrl: './request-group-page.component.html',
  styleUrls: ['./request-group-page.component.scss'],
})
export class RequestGroupPageComponent implements OnInit, OnDestroy {
  GroupList = [];
  GroupList2 = [];
  userID: string;
  subscribers = [];
  users = [];
  data: Observable<any>;
  subscription: Subscription[] = [];
  Lang: string
  keyWordsSearch;

  constructor(private GrpServ: GroupService, private us: UserService) { }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang')
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
      }
    });
    this.subscription.push(sub);
    this.GroupList = [];

    let sub1 = this.GrpServ.getGroups().subscribe((res) => {
      this.GroupList2 = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        };
      });
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
          for (let u of this.users) {
            if (u.id == this.userID && u.Role > 0) {
              if (!this.GroupList.includes(i))
                this.GroupList.push(i);
            } else if (u.id == this.userID && u.Role == 0) {
              if (!this.subscribers.includes(i))
                this.subscribers.push(i);
            } else {
              this.GroupList = this.GroupList.filter((ele) => ele.id != i.id);
              this.subscribers = this.subscribers.filter((ele) => ele.id != i.id);
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
