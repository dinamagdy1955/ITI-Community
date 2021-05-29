import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-hcomment-form',
  templateUrl: './hcomment-form.component.html',
  styleUrls: ['./hcomment-form.component.scss'],
})
export class HCommentFormComponent implements OnInit {
  userID: string;
  selectedLang: string;
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
    public translateService: TranslateService,
    private commentService: HPostCommentService,
    private fb: FormBuilder,
    private us: UserService
  ) {
    translateService.addLangs(['en', 'ar']);
    if (
      localStorage.getItem('lang') == undefined ||
      localStorage.getItem('lang') == 'en'
    ) {
      translateService.use('en');
      localStorage.setItem('lang', 'en');
      this.selectedLang='en'
      // document.dir = 'ltr';
    } else if (localStorage.getItem('lang') == 'ar') {
      translateService.use('ar');
      localStorage.setItem('lang', 'ar');
      this.selectedLang='ar'
      // document.dir = 'rtl';
    }
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
