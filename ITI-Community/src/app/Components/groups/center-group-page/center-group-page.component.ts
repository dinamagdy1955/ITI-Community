import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup2 } from '../ViewModel/igroup';

@Component({
  selector: 'app-center-group-page',
  templateUrl: './center-group-page.component.html',
  styleUrls: ['./center-group-page.component.scss']
})
export class CenterGroupPageComponent implements OnInit, OnDestroy, OnChanges {
  userID: string
  avatar: string
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
    this.avatar = localStorage.getItem('avatar')
    let sub = this.GrpServ.getGrpById(this.GroupId).subscribe(res => {
      this.Group = res;
    })
    this.subscription.push(sub)


    // this.GrpServ.getGroupUsers(this.GroupId).admins.subscribe(res => {
    //   this.admins2 = res.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       data: e.payload.doc.data()
    //     }
    //   })
    //   for (let i of this.admins2) {
    //     this.admin.push(i.id)
    //   }
    // })

  }

  ngOnChanges(): void {
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

  cancelRequest(uid, id, role) {
    this.GrpServ.DeleteMembers(uid, id, role)
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
