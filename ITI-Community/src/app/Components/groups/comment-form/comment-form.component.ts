import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { PostCommentService } from '../Services/post-comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit, OnDestroy {
  userID: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: string;
  @Input() defPostId: string;
  commentForm: FormGroup;
  data: Observable<any>;
  subscription: Subscription[] = [];
  Lang: string
  constructor(
    private commentService: PostCommentService,
    private fb: FormBuilder,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
      }
    });
    this.subscription.push(sub);
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date(),
      User: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        avatar: '',
        id: '',
      },
    });
  }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang')
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date(),
      User: {
        firstName: this.firstName,
        lastName: this.lastName,
        jobTitle: this.jobTitle,
        avatar: this.avatar,
        id: this.userID,
      },
    });
  }

  onSubmit() {
    this.commentService.writeComment(this.commentForm.value, this.defPostId);
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date(),
      User: {
        firstName: this.firstName,
        lastName: this.lastName,
        jobTitle: this.jobTitle,
        avatar: this.avatar,
        id: this.userID,
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
