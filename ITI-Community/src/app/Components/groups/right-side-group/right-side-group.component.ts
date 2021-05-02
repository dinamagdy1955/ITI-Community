import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() GroupId: string;

  allUsers
  admins = []
  members = []
  subscribers = []
  userID

  keyWordsSearch
  private subscription: Subscription[] = [];
  constructor(
    private GrpServ: GroupService,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
    let sub = this.GrpServ.getGrpById(this.GroupId).subscribe((res) => {
      this.Group = res;
      this.admins = [];
      this.members = [];
      this.subscribers = [];

      let sub2 = this.userService.getAllUsersData().pipe().subscribe((res) => {
        console.log('aa')

        this.allUsers = res
        this.Group.admin.filter(s => {
          this.allUsers.forEach(e => {
            if (s == e.payload.doc.id) {
              this.admins.push({
                id: e.payload.doc.id,
                data: e.payload.doc.data()
              })
            }
          });
        })

        this.Group.members.filter(s => {
          this.allUsers.forEach(e => {
            if (s == e.payload.doc.id) {
              this.members.push({
                id: e.payload.doc.id,
                data: e.payload.doc.data()
              })
            }
          });
        })

        this.Group.subscriber.filter(s => {
          this.allUsers.forEach(e => {
            if (s == e.payload.doc.id) {
              this.subscribers.push({
                id: e.payload.doc.id,
                data: e.payload.doc.data()
              })
            }
          });
        })
      })
      this.subscription.push(sub2);
    });
    this.subscription.push(sub);
  }

  ngOnDestroy(): void {
    for (let subs of this.subscription) {
      subs.unsubscribe();
      this.admins = []
      this.members = []
      this.subscribers = []
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
