import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup, IGroup2 } from '../ViewModel/igroup';

@Component({
  selector: 'app-request-group-page',
  templateUrl: './request-group-page.component.html',
  styleUrls: ['./request-group-page.component.scss']
})
export class RequestGroupPageComponent implements OnInit, OnDestroy {

  GroupList;
  userID: string
  admins
  members
  subscribers
  subscription: Subscription[] = []
  constructor(private GrpServ: GroupService) { }


  ngOnInit(): void {
    this.userID = localStorage.getItem('uid')
    let sub1 = this.GrpServ.getGroups().subscribe((res) => {
      this.GroupList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        }
      })
      this.admins = []
      this.members = []
      this.subscribers = []
      for (let i of this.GroupList) {
        i.admin = []
        i.member = []
        i.subscriber = []
        let sub = this.GrpServ.getGroupUsers(i.id).admins.subscribe(res => {
          i.admin = []
          res.map(e => i.admin.push(e.payload.doc.id))
          this.admins.concat(i.admin)
        })
        let sub2 = this.GrpServ.getGroupUsers(i.id).members.subscribe(res => {
          i.member = []
          res.map(e => i.member.push(e.payload.doc.id))
          this.members.concat(i.member)
        })
        let sub3 = this.GrpServ.getGroupUsers(i.id).subscribers.subscribe(res => {
          i.subscriber = []
          res.map(e => i.subscriber.push(e.payload.doc.id))
          this.subscribers.concat(i.subscriber)
        })
        this.subscription.push(sub)
        this.subscription.push(sub2)
        this.subscription.push(sub3)
      }
    })
    this.subscription.push(sub1)


    // let sub = this.GrpServ.getAllGroups().subscribe((resp) => {
    //   this.GroupList = resp.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...(e.payload.doc.data() as object)
    //     } as IGroup
    //   })
    // })
    // this.subscription.push(sub)
  }

  JoinOut(user, id) {
    this.GrpServ.DeleteRequest(user, id)
  }

  leaveGroup(user, id) {
    this.GrpServ.leaveGroup(user, id)
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
