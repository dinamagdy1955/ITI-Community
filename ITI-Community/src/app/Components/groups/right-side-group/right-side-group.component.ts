import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { ChatsService } from '../../messages/Service/chats.service';
import { GroupService } from '../Services/group.service';
import { ToastServiceService } from '../toasterMsg/toastService.service';
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
  loggedUser;
  userID;
  adminRole = [];
  adminID = [];
  keyWordsSearch;
  data: Observable<any>;
  Lang: string
  private subscription: Subscription[] = [];
  constructor(
    private GrpServ: GroupService,
    private modalService: NgbModal,
    private us: UserService,
    private chat: ChatsService,
    private toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang')
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
        this.loggedUser = res;
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

  openChat(logged, reci) {
    this.chat.newChat(logged, reci);
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  showMsg() {
    if (this.Lang == 'en') {
      this.toastService.show('Member Updated', { classname: 'bg-info text-light top-center', delay: 5000 });
    } else {
      this.toastService.show('???? ?????????? ??????????', { classname: 'bg-info text-right text-light top-center', delay: 5000 });
    }
  }

  showMsgDanger() {
    if (this.Lang == 'en') {
      this.toastService.show('Member Deleted', { classname: 'bg-danger text-light top-center', delay: 5000 });
    } else {
      this.toastService.show('???? ?????? ??????????', { classname: 'bg-danger text-right text-light top-center', delay: 5000 });
    }
  }

  Roles(uid, id, role) {
    this.showMsg()
    this.GrpServ.MembersRole(uid, id, role);
  }

  deleteUser(uid, id) {
    this.showMsgDanger()
    this.GrpServ.DeleteMembers(uid, id);
  }
}
