import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';
import { ToastServiceService } from '../toasterMsg/toastService.service';

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
  Lang: string;
  keyWordsSearch;

  constructor(private GrpServ: GroupService, private us: UserService, alertConfig: NgbAlertConfig, private toastService: ToastServiceService) {
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
  }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang');
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
          this.users = this.users.filter((ss) => ss.id == this.userID);
          if (this.users.length > 0) {
            let flag = false;
            if (this.users[0].id == this.userID && this.users[0].Role > 0) {
              this.GroupList.find((e) => {
                if (e.id == i.id) {
                  flag = true;
                }
              });
              if (!flag) this.GroupList.push(i);
            } else if (
              this.users[0].id == this.userID &&
              this.users[0].Role == 0
            ) {
              this.subscribers.find((e) => {
                if (e.id == i.id) {
                  flag = true;
                }
              });
              if (!flag) this.subscribers.push(i);
            } else {
              this.GroupList = this.GroupList.filter((ele) => ele.id != i.id);
              this.subscribers = this.subscribers.filter(
                (ele) => ele.id != i.id
              );
            }
          } else {
            this.GroupList = this.GroupList.filter((ele) => ele.id != i.id);
            this.subscribers = this.subscribers.filter((ele) => ele.id != i.id);
          }
        });
        this.subscription.push(sub);
      }
    });
    this.subscription.push(sub1);
  }

  leaveGroup(user, id) {
    this.showMsg()
    this.GrpServ.DeleteMembers(user, id);
  }

  showMsg() {
    if (this.Lang == 'en') {
      this.toastService.show('You Have Been Left The Group', { classname: 'bg-danger text-light', delay: 5000 });
    } else {
      this.toastService.show('لقد قمت بمغادرة المجموعة', { classname: 'bg-danger text-right text-light', delay: 5000 });
    }
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}