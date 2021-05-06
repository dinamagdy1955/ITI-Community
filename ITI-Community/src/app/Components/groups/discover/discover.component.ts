import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup, IGroup2 } from '../ViewModel/igroup';
import { IUser } from '../ViewModel/ipost';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit, OnDestroy {

  Gid: string
  GroupList

  GroupList2;
  userID: string

  admins: IUser[]
  members: IUser[]
  subscribers: IUser[]
  allUsers = []
  subscription: Subscription[] = []
  constructor(private groupService: GroupService) { }
  ngOnInit(): void {
    this.userID = localStorage.getItem('uid')
    let sub1 = this.groupService.getGroups().subscribe((res) => {
      this.GroupList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        }
      })
      this.allUsers = []
      for (let i of this.GroupList) {
        i.users = []
        let sub = this.groupService.getGroupUsers(i.id).admins.subscribe(res => {
          res.map(e => i.users.push(e.payload.doc.id))
          this.allUsers.concat(i.users)
        })
        let sub2 = this.groupService.getGroupUsers(i.id).members.subscribe(res => {
          res.map(e => i.users.push(e.payload.doc.id))
          this.allUsers.concat(i.users)
        }
        )
        let sub3 = this.groupService.getGroupUsers(i.id).subscribers.subscribe(res => {
          res.map(e => i.users.push(e.payload.doc.id))
          this.allUsers.concat(i.users)
        }
        )
        this.subscription.push(sub)
        this.subscription.push(sub2)
        this.subscription.push(sub3)
      }
    })
    this.subscription.push(sub1)







    // this.userID = localStorage.getItem('uid')
    // let sub = this.groupService.getAllGroups().subscribe(res => {
    //   this.GroupList2 = res.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...(e.payload.doc.data() as object)
    //     } as IGroup
    //   })
    // })
    // this.subscription.push(sub)
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
