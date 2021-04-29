import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../Services/group.service';
import { PostCommentService } from '../Services/post-comment.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  @Input() PostID: string
  GroupId
  Group
  adminGroup
  subscriptions: Subscription[] = []
  postID
  commentList
  getComments = []
  usersData = []
  userID
  constructor(
    private commentService: PostCommentService,
    private usersService: UserService,
    private activeRoute: ActivatedRoute,
    private groupService: GroupService) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid')
    let sub = this.activeRoute.paramMap.subscribe(param => {
      this.GroupId = param.get('id')
      let sub5 = this.groupService.getGrpById(this.GroupId).subscribe(res => {
        this.Group = res
        this.adminGroup = this.Group.admin
      })
      this.subscriptions.push(sub5)
    })
    this.subscriptions.push(sub)
    let sub1 = this.commentService.getPostComments().subscribe((res) => {
      this.commentList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        }
      })
      this.getComments = []
      for (let c of this.commentList) {
        if (c.postID === this.PostID) {
          this.getComments.push(c)
          let sub2 = this.usersService.getUserData(c.userID).subscribe(res => {
            this.usersData.push({
              id: res.payload.id,
              data: res.payload.data()
            })
          })
          this.subscriptions.push(sub2)
        }
      }
    })
    this.subscriptions.push(sub1)

  }

  deleteComment(id) {
    this.commentService.deleteComment(id);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}

