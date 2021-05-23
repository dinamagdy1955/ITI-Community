import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';

@Component({
  selector: 'app-hcomment-form',
  templateUrl: './hcomment-form.component.html',
  styleUrls: ['./hcomment-form.component.scss']
})
export class HCommentFormComponent implements OnInit {
  userID: string
  firstName: string
  lastName: string
  avatar: string
  @Input() defPostId: string
  @Input() AUTHId: string
  commentForm: FormGroup
  constructor(
    private commentService: HPostCommentService,
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
    this.commentService.writeComment(this.commentForm.value, this.defPostId,this.AUTHId);
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
