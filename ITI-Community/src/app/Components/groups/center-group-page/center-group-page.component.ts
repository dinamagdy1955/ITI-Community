import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';
import { IGroup2 } from '../ViewModel/igroup';

@Component({
  selector: 'app-center-group-page',
  templateUrl: './center-group-page.component.html',
  styleUrls: ['./center-group-page.component.scss'],
})
export class CenterGroupPageComponent implements OnInit, OnDestroy, OnChanges {
  userID: string;
  avatar: string;
  Group: IGroup2;
  @Input() GroupId: string;
  @Input() users = [];
  admin = [];
  member = [];
  subscribe = [];
  data: Observable<any>;
  Lang: string;
  private subscription: Subscription[] = [];
  constructor(private GrpServ: GroupService, private us: UserService, private tranSev: TranslateService) { }

  ngOnInit(): void {
    this.data = this.us.localUserData.asObservable();
    this.Lang = localStorage.getItem('lang');

    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
        this.avatar = res.avatar;
      }
    });
    this.subscription.push(sub);
    let sub1 = this.GrpServ.getGrpById(this.GroupId).subscribe((res) => {
      this.Group = res;
    });
    this.subscription.push(sub1);
  }

  ngOnChanges(): void {
    for (let u of this.users) {
      if (u.id == this.userID && u.Role == 1) {
        this.admin.push(u.id);
      }
      if (u.id == this.userID && u.Role == 2) {
        this.member.push(u.id);
      }
      if (u.id == this.userID && u.Role == 0) {
        this.subscribe.push(u.id);
      }
    }
  }

  requestToJoin(uid, id) {
    this.GrpServ.sendRequest(uid, id);
  }

  cancelRequest(uid, id) {
    this.GrpServ.DeleteMembers(uid, id);
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
