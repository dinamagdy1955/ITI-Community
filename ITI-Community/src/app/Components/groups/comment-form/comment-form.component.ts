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
  firstName: string
  lastName: string
  avatar: string
  @Input() defPostId: string
  commentForm: FormGroup
  constructor(
    private commentService: PostCommentService,
    private fb: FormBuilder
  ) {
    this.userID = localStorage.getItem('uid');
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date,
      User: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        avatar: '',
        id: ''
      }
    })
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date,
      User: {
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        jobTitle: localStorage.getItem('jobTitle'),
        avatar: localStorage.getItem('avatar'),
        id: localStorage.getItem('uid')
      }
    })
  }

  onSubmit() {
    this.commentService.writeComment(this.commentForm.value, this.defPostId);
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date,
      User: {
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        jobTitle: localStorage.getItem('jobTitle'),
        avatar: localStorage.getItem('avatar'),
        id: localStorage.getItem('uid')
      }
    })
  }

}
