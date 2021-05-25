import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-hcomment-form',
  templateUrl: './hcomment-form.component.html',
  styleUrls: ['./hcomment-form.component.scss'],
})
export class HCommentFormComponent implements OnInit {
  userID: string;

  uid;
  firstName;
  lastName;
  jobTitle;
  avatar;
  avatarCover;
  data: Observable<any>;
  subscription: Subscription[] = [];
  @Input() defPostId: string;
  @Input() AUTHId: string;
  commentForm: FormGroup;
  constructor(
    private commentService: HPostCommentService,
    private fb: FormBuilder,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
        this.avatarCover = res.avatarCover;
      }
    });
    this.subscription.push(sub);

    this.userID = this.uid;
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
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date(),
      User: {
        firstName: this.firstName,
        lastName: this.lastName,
        jobTitle: this.jobTitle,
        avatar: this.avatar,
        id: this.uid,
      },
    });
  }

  onSubmit() {
    this.commentService.writeComment(
      this.commentForm.value,
      this.defPostId,
      this.AUTHId,
      this.uid
    );
    this.commentForm = this.fb.group({
      Body: '',
      CommentDate: new Date(),
      User: {
        firstName: this.firstName,
        lastName: this.lastName,
        jobTitle: this.jobTitle,
        avatar: this.avatar,
        id: this.uid,
      },
    });
  }
}
