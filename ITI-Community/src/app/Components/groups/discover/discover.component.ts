import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  GroupList = [];
  GroupList2;
  userID: string;
  allUsers = [];
  data: Observable<any>;
  subscription: Subscription[] = [];
  Lang: string
  keyWordsSearch;
  constructor(private groupService: GroupService, private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
      }
    });
    this.subscription.push(sub);

  }
  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang')
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
            if (!this.GroupList.includes(i))
              this.GroupList.push(i);
          } else {
            this.GroupList = this.GroupList.filter((ele) => ele.id != i.id);
          }
        });
        this.subscription.push(sub);
      }
    });
    this.subscription.push(sub1);
  }

  sendRequest(user, id) {
    this.groupService.sendRequest(user, id);
  }
  identify(index, g) {
    return g.id;
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
