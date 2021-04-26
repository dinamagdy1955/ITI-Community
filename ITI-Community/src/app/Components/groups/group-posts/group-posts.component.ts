import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupPostsService } from '../Services/group-posts.service';

@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.scss'],
})
export class GroupPostsComponent implements OnInit {
  postList;
  postGroupList = [];
  GroupId: string;
  userID: string;
  isPostLiked: boolean

  liked

  constructor(
    private getall: GroupPostsService,
    private activeRoute: ActivatedRoute,
  ) {
    this.userID = localStorage.getItem('uid');
  }

  ngOnInit(): void {
    let param = this.activeRoute.paramMap.subscribe((res) => {
      this.GroupId = res.get('id');
    });
    this.getall.getGroupPost().subscribe((res) => {
      // console.log('res', res);
      this.postList = res.map((e) => {
        // console.log('e.payload', e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        };
      });
      this.postGroupList = [];
      for (let post of this.postList) {
        if (post.GroupId === this.GroupId) {
          this.postGroupList.push(post);
        }
      }

    });
    this.postGroupList.forEach(e => {
      if (e.Likes.find(el => el !== this.userID)) {
        this.isPostLiked = false
      } else {
        this.isPostLiked = true
      }
    })

  }

  Like(like, id) {
    this.getall.giveLike(like, id);
  }

}
