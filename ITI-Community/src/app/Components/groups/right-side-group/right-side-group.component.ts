import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';
import { IGroup, IGroup2 } from '../ViewModel/igroup';

@Component({
  selector: 'app-right-side-group',
  templateUrl: './right-side-group.component.html',
  styleUrls: ['./right-side-group.component.scss']
})
export class RightSideGroupComponent implements OnInit, OnDestroy {

  Group: IGroup2;
  @Input() GroupId: string;
  @Input() admins = []
  @Input() members = []
  @Input() subscribers = []
  userID
  @Input() adminRole = []
  keyWordsSearch
  private subscription: Subscription[] = [];
  constructor(
    private GrpServ: GroupService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
    let sub = this.GrpServ.getGrpById(this.GroupId).subscribe((res) => {
      this.Group = res;
    });
    this.subscription.push(sub);



    // let sub2 = this.userService.getAllUsersData().subscribe((res) => {
    //   this.allUsers = res
    //   this.Group.admin.filter(s => {
    //     this.allUsers.forEach(e => {
    //       if (s == e.payload.doc.id) {
    //         this.admins.push({
    //           id: e.payload.doc.id,
    //           data: e.payload.doc.data()
    //         })
    //       }
    //     });
    //   })

    //   this.Group.members.filter(s => {
    //     this.allUsers.forEach(e => {
    //       if (s == e.payload.doc.id) {
    //         this.members.push({
    //           id: e.payload.doc.id,
    //           data: e.payload.doc.data()
    //         })
    //       }
    //     });
    //   })

    //   this.Group.subscriber.filter(s => {
    //     this.allUsers.forEach(e => {
    //       if (s == e.payload.doc.id) {
    //         this.subscribers.push({
    //           id: e.payload.doc.id,
    //           data: e.payload.doc.data()
    //         })
    //       }
    //     });
    //   })
    //   sub2.unsubscribe()
    // })

    // for (let i of this.Group.admin) {
    //   let sub1 = this.userService.getUserData(i).subscribe((res) => {
    //     this.subscription.push(sub1);
    //     this.admins.push({
    //       id: res.payload.id,
    //       data: res.payload.data(),
    //     });
    //   });
    //   this.subscription.push(sub1);
    // }

    // for (let i of this.Group.members) {
    //   let sub2 = this.userService.getUserData(i).subscribe((res) => {
    //     this.subscription.push(sub2);
    //     this.members.push({
    //       id: res.payload.id,
    //       data: res.payload.data(),
    //     });
    //   });
    //   this.subscription.push(sub2);
    // }
    // for (let i of this.Group.subscriber) {
    //   let sub2 = this.userService.getUserData(i).subscribe((res) => {
    //     this.subscription.push(sub2);
    //     this.subscribers.push({
    //       id: res.payload.id,
    //       data: res.payload.data(),
    //     });
    //   });
    //   this.subscription.push(sub2);
    // }

  }

  ngOnDestroy(): void {
    for (let subs of this.subscription) {
      subs.unsubscribe();
    }
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  Roles(uid, id, role) {
    this.GrpServ.MembersRole(uid, id, role)
  }

  deleteUser(uid, id, role) {
    this.GrpServ.DeleteMembers(uid, id, role)
  }

}
