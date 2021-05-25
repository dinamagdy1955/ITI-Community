import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';
import { IGroup2 } from '../ViewModel/igroup';

@Component({
  selector: 'app-right-side-group',
  templateUrl: './right-side-group.component.html',
  styleUrls: ['./right-side-group.component.scss'],
})
export class RightSideGroupComponent implements OnInit, OnChanges, OnDestroy {
  Group: IGroup2;
  @Input() GroupId: string;
  @Input() users = [];
  userID;
  adminRole = [];
  adminID = [];
  keyWordsSearch;
  data: Observable<any>;
  private subscription: Subscription[] = [];
  constructor(
    private GrpServ: GroupService,
    private modalService: NgbModal,
    private us: UserService
  ) {}

  ngOnInit(): void {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
      }
    });
    this.subscription.push(sub);
    let sub1 = this.GrpServ.getGrpById(this.GroupId).subscribe((res) => {
      this.Group = res;
    });
    this.subscription.push(sub1);
  }

  ngOnChanges(): void {
    this.adminRole = [];
    for (let a of this.users) {
      if (a.Role == 1) {
        this.adminRole.push(a);
        this.adminID.push(a.id);
      }
    }
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
    this.GrpServ.MembersRole(uid, id, role);
  }

  deleteUser(uid, id) {
    this.GrpServ.DeleteMembers(uid, id);
  }
}
