import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostCommentService } from '../Services/post-comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  userID: string
  @Input() defPostId: string
  commentForm: FormGroup
  constructor(
    private commentService: PostCommentService,
    private fb: FormBuilder
  ) {
    this.userID = localStorage.getItem('uid');
    this.commentForm = this.fb.group({
      postID: this.defPostId,
      userID: this.userID,
      comment: '',
      date: new Date
    })
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      postID: this.defPostId,
      userID: this.userID,
      comment: '',
      date: new Date
    })
  }

  onSubmit() {
    this.commentService.writeComment(this.commentForm.value);
    this.commentForm = this.fb.group({
      postID: this.defPostId,
      userID: this.userID,
      comment: '',
      date: new Date
    })
  }

}
