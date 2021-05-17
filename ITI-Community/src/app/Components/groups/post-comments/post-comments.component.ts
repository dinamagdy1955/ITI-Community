import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostCommentService } from '../Services/post-comment.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  @Input() PostID: string
  @Input() admins
  subscriptions: Subscription[] = []
  getComments = []
  userID
  constructor(
    private commentService: PostCommentService,
  ) { }

  identify(index, c) {
    return c.id
  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('uid')
    let sub = this.commentService.getPostComments2(this.PostID).subscribe(res => {
      this.getComments = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        }
      })
    })
    this.subscriptions.push(sub)
  }

  deleteComment(id, postId) {
    this.commentService.deleteComment(id, postId);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}

