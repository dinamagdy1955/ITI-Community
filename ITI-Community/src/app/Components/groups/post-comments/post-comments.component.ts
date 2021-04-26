import { Component, Input, OnInit } from '@angular/core';
import { PostCommentService } from '../Services/post-comment.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  postID
  @Input() PostID: string
  commentList
  getComments = []
  constructor(private commentService: PostCommentService) { }

  ngOnInit(): void {
    this.commentService.getPostComments().subscribe((res) => {
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
        }
      }
    })
  }
}

