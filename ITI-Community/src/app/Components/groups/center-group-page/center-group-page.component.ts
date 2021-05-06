import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup2 } from '../ViewModel/igroup';

@Component({
  selector: 'app-center-group-page',
  templateUrl: './center-group-page.component.html',
  styleUrls: ['./center-group-page.component.scss']
})
export class CenterGroupPageComponent implements OnInit, OnDestroy {
  userID: string
  Group: IGroup2;
  @Input() GroupId: string;
  @Input() admins = []
  @Input() members = []
  @Input() subscribers = []
  @Input() adminRole = []

  admin = []
  member = []
  subscribe = []

  private subscription: Subscription[] = [];
  constructor(
    private GrpServ: GroupService,
  ) {
  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid')
    let sub = this.GrpServ.getGrpById(this.GroupId).subscribe(res => {
      this.Group = res;
    })
    this.subscription.push(sub)
    for (let i of this.admins) {
      this.admin.push(i.id)
    }
    for (let i of this.members) {
      this.member.push(i.id)
    }
    for (let i of this.subscribers) {
      this.subscribe.push(i.id)
    }
  }

  requestToJoin(uid, id) {
    this.GrpServ.sendRequest(uid, id);
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
