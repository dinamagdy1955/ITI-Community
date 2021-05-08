import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() GroupId: string;
  userID: string;
  singleGroup
  adminGroup = []
  usersData = [];
  avatar
  constructor(
    private getall: GroupPostsService,
    private groupService: GroupService
  ) {
    this.userID = localStorage.getItem('uid');
  }


  ngOnInit(): void {
    this.avatar = localStorage.getItem('avatar')
    let sub3 = this.groupService.getGroupUsers(this.GroupId).admins.subscribe(res => {
      res.map(e => {
        this.adminGroup.push(e.payload.doc.id)
      })
    })
    this.subsriptions.push(sub3)
    let sub4 = this.getall.GroupPosts(this.GroupId).subscribe(res => {
      this.postGroupList = res.map(e => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data()
        }
      })
    })
    this.subsriptions.push(sub4)













    // let sub3 = this.groupService.getGrpById(this.GroupId).subscribe(res => {
    //   this.singleGroup = res
    //   this.adminGroup = this.singleGroup.admin
    // })

    // this.subsriptions.push(sub3)

    // let sub1 = this.getall.getGroupPost().subscribe((res) => {
    //   this.postList = res.map((e) => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...(e.payload.doc.data() as object),
    //     };
    //   });
    //   this.postGroupList = [];
    //   this.usersData = [];
    //   for (let post of this.postList) {
    //     if (post.GroupId === this.GroupId) {
    //       this.postGroupList.push(post);
    //       let sub2 = this.usersService.getUserData(post.UserId).subscribe(res => {
    //         this.usersData.push({
    //           id: res.payload.id,
    //           data: res.payload.data()
    //         })
    //       })
    //       this.subsriptions.push(sub2)
    //     }
    //   }
    // });
    // this.subsriptions.push(sub1)


  }



  Like(like, usrid) {
    this.getall.giveLike(like, usrid);
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
