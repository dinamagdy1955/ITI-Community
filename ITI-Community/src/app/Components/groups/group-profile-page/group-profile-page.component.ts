import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-group-profile-page',
  templateUrl: './group-profile-page.component.html',
  styleUrls: ['./group-profile-page.component.scss'],
})
export class GroupProfilePageComponent implements OnInit, OnDestroy {
  GroupId: string;
  admins = [];
  members = [];
  subscribers = [];
  adminRole = [];
  users = [];
  private subscription: Subscription[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private GrpServ: GroupService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.GroupId = params.get('id');
      this.GrpServ.getGroupsUsers(this.GroupId).subscribe((res) => {
        this.users = res.map((e) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        });
      });
    });

    // this.admins = [];
    // this.members = [];
    // this.subscribers = [];
    // this.adminRole = []
    // let sub1 = this.GrpServ.getGroupUsers(this.GroupId).admins.subscribe(res => {
    //   this.admins = res.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       data: e.payload.doc.data()
    //     }
    //   })
    //   this.admins.map(e => {
    //     this.adminRole.push(e.id)
    //   })
    // })
    // this.subscription.push(sub1)
    // let sub2 = this.GrpServ.getGroupUsers(this.GroupId).members.subscribe(res => {
    //   this.members = res.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       data: e.payload.doc.data()
    //     }
    //   })
    // })
    // this.subscription.push(sub2)

    // let sub3 = this.GrpServ.getGroupUsers(this.GroupId).subscribers.subscribe(res => {
    //   this.subscribers = res.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       data: e.payload.doc.data()
    //     }
    //   })
    // })
    // this.subscription.push(sub3)
  }
  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
