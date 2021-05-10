import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup2 } from '../ViewModel/igroup';

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

  @Input() users = []
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
    console.log(this.users)
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

  deleteUser(uid, id) {
    this.GrpServ.DeleteMembers(uid, id)
  }

}
