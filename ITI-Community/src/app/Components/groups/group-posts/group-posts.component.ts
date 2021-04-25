import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupPostsService } from '../Services/group-posts.service';
import { IPost } from '../ViewModel/ipost';

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
  constructor(
    private getall: GroupPostsService,
    private activeRoute: ActivatedRoute
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
  }

  Like(like, id) {
    this.getall.giveLike(like, id);
  }
}
