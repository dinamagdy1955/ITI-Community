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

  turnOff: boolean = false
  counter: number = 0
  constructor(
    public commentService: PostCommentService,
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
          ...(e.payload.doc.data() as object),
          doc: e.payload.doc
        }
      })
      this.hideBtn(res);
    })
    this.subscriptions.push(sub)
  }


  loadMore() {
    this.counter += 5
    let param = this.getComments[this.getComments.length - 1].doc
    this.commentService.getPostComments2(this.PostID, param).subscribe(res => {
      res.map(e => {
        this.getComments.push({
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
          doc: e.payload.doc
        })
      })
      this.hideBtn(res)
    })
  }

  hideBtn(res) {
    if ((res.length % 5 != 0 && res.length - this.counter == 0) || res.length % 5 != 0 || res.length == 0) {
      this.turnOff = true
    } else {
      this.turnOff = false
    }
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

