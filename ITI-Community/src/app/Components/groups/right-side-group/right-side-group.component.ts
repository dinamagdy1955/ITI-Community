import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';
import { IGroup } from '../ViewModel/igroup';

@Component({
  selector: 'app-right-side-group',
  templateUrl: './right-side-group.component.html',
  styleUrls: ['./right-side-group.component.scss']
})
export class RightSideGroupComponent implements OnInit, OnDestroy {

  Group: IGroup;
  GroupId: string;

  admins = []
  members = []
  subscribers = []

  userID

  keyWordsSearch

  private subscription: Subscription[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private GrpServ: GroupService,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
    let param = this.activeRoute.paramMap.subscribe((params) => {
      this.GroupId = params.get('id');
      this.GrpServ.getGrpById(this.GroupId).subscribe(res => {
        this.Group = res;
        this.admins = []
        this.members = []
        this.subscribers = []
        for (let i of this.Group.admin) {
          let sub1 = this.userService.getUserData(i).subscribe((res) => {
            this.subscription.push(sub1)
            this.admins.push({
              id: res.payload.id,
              data: res.payload.data()
            })
          })
        }
        for (let i of this.Group.members) {
          let sub2 = this.userService.getUserData(i).subscribe((res) => {
            this.subscription.push(sub2)
            this.members.push({
              id: res.payload.id,
              data: res.payload.data()
            })
          })
        }
        for (let i of this.Group.subscriber) {
          let sub2 = this.userService.getUserData(i).subscribe((res) => {
            this.subscription.push(sub2)
            this.subscribers.push({
              id: res.payload.id,
              data: res.payload.data()
            })
          })
        }
      })
    })
    this.subscription.push(param);
  }

  ngOnDestroy(): void {
    for (let subs of this.subscription) {
      subs.unsubscribe();
    }
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  MemberRole(uid, id) {
    this.GrpServ.updateMembers(uid, id);
  }

  makeMember(uid, id) {
    this.GrpServ.updateRequests(uid, id)
  }

  deleteUser(uid, id) {
    this.GrpServ.DeleteMembers(uid, id)
  }

}
