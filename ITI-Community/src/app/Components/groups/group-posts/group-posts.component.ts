import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupPostsService } from '../Services/group-posts.service';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.scss'],
})
export class GroupPostsComponent implements OnInit, OnDestroy {
  subsriptions: Subscription[] = [];
  postGroupList = [];
  @Input() GroupId: string;
  userID: string;
  adminGroup = [];
  avatar;
  data: Observable<any>;
  viewImg: boolean = false;
  Lang: string;
  keyWordsSearch
  constructor(
    private getall: GroupPostsService,
    private groupService: GroupService,
    private us: UserService,
    private modalService: NgbModal
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
        this.avatar = res.avatar;
      }
    });
    this.subsriptions.push(sub);
  }

  identify(index, post) {
    return post.id;
  }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang');
    let sub3 = this.groupService
      .getGroupsUsers(this.GroupId)
      .subscribe((res) => {
        res.map((e) => {
          if (e.payload.doc.data().Role == 1) {
            this.adminGroup.push(e.payload.doc.id);
          }
        });
      });
    this.subsriptions.push(sub3);
    let sub4 = this.getall.GroupPosts(this.GroupId).subscribe((res) => {
      this.postGroupList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    });
    this.subsriptions.push(sub4);
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  Like(like, usrid) {
    this.getall.giveLike(like, usrid);
  }

  deletePost(id) {
    this.getall.deletePost(id);
  }

  ngOnDestroy(): void {
    for (let i of this.subsriptions) {
      i.unsubscribe();
    }
  }
}
