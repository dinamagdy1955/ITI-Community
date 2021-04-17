import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupPostsService } from '../Services/group-posts.service';
import { IPost } from '../ViewModel/ipost';

@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.scss']
})
export class GroupPostsComponent implements OnInit {
  postList;
  postGroupList = [];
  GroupId: string;
  constructor(private getall: GroupPostsService, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    let param = this.activeRoute.paramMap.subscribe(res => {
      this.GroupId = res.get('id')
    })
    this.getall.getGroupPost()
      .subscribe(res => {
        this.postList = res.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as object)
          }
        })
        this.postGroupList = []
        for (let post of this.postList) {
          if (post.GroupId === this.GroupId) {
            this.postGroupList.push(post)
          }
        }
      })
  }

  Like(post: IPost, id) {

    this.getall.giveLike(post, id)
  }

}
