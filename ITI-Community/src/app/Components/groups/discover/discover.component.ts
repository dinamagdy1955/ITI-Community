import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup } from '../ViewModel/igroup';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit, OnDestroy {

  GroupList;
  userID: string
  subscription: Subscription[] = []
  constructor(private groupService: GroupService) { }


  ngOnInit(): void {
    this.userID = localStorage.getItem('uid')
    let sub = this.groupService.getAllGroups().subscribe(res => {
      this.GroupList = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as IGroup
      })
    })
    this.subscription.push(sub)
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
