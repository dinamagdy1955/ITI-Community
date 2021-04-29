import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupPostsService } from '../Services/group-posts.service';
import { GroupService } from '../Services/group.service';

@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.scss'],
})
export class GroupPostsComponent implements OnInit, OnDestroy {
  subsriptions: Subscription[] = []
  postList;
  postGroupList = [];
  GroupId: string;
  userID: string;
  singleGroup
  adminGroup
  usersData = [];

  constructor(
    private getall: GroupPostsService,
    private activeRoute: ActivatedRoute,
    private usersService: UserService,
    private groupService: GroupService
  ) {
    this.userID = localStorage.getItem('uid');
  }


  ngOnInit(): void {
    let param = this.activeRoute.paramMap.subscribe((res) => {
      this.GroupId = res.get('id');
    });
    this.subsriptions.push(param)

    let sub3 = this.groupService.getGrpById(this.GroupId).subscribe(res => {
      this.singleGroup = res
      this.adminGroup = this.singleGroup.admin
    })

    this.subsriptions.push(sub3)

    let sub1 = this.getall.getGroupPost().subscribe((res) => {
      this.postList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        };
      });
      this.postGroupList = [];
      this.usersData = [];
      for (let post of this.postList) {
        if (post.GroupId === this.GroupId) {
          this.postGroupList.push(post);
          let sub2 = this.usersService.getUserData(post.UserId).subscribe(res => {
            this.usersData.push({
              id: res.payload.id,
              data: res.payload.data()
            })
          })
          this.subsriptions.push(sub2)
        }
      }
    });
    this.subsriptions.push(sub1)
  }

  Like(like, id) {
    this.getall.giveLike(like, id);
  }

  deletePost(id) {
    this.getall.deletePost(id)
  }

  ngOnDestroy(): void {
    for (let i of this.subsriptions) {
      i.unsubscribe();
    }
  }

}
