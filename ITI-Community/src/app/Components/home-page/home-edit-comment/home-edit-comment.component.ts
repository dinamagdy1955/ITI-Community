import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-edit-comment',
  templateUrl: './home-edit-comment.component.html',
  styleUrls: ['./home-edit-comment.component.scss'],
})
export class HomeEditCommentComponent implements OnInit {
  closeResult = '';
  editCommentForm: FormGroup;
  selectedLang: string;
  @Input() commentID;
  @Input() postID;
  @Input() AUTHId;
  singleComment;
  uid;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(
    public translateService: TranslateService,
    private model: NgbModal,
    private FB: FormBuilder,
    private commentService: HPostCommentService,
    private us: UserService
  ) {
    translateService.addLangs(['en', 'ar']);
    if (
      localStorage.getItem('lang') == undefined ||
      localStorage.getItem('lang') == 'en'
    ) {
      translateService.use('en');
      localStorage.setItem('lang', 'en');
      this.selectedLang = 'en';
      // document.dir = 'ltr';
    } else if (localStorage.getItem('lang') == 'ar') {
      translateService.use('ar');
      localStorage.setItem('lang', 'ar');
      this.selectedLang = 'ar';
      // document.dir = 'rtl';
    }
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
    this.editCommentForm = this.FB.group({
      Body: '',
    });
  }

  ngOnInit(): void {
    this.commentService
      .getMyCommentsById(this.postID, this.commentID, this.uid)
      .subscribe((res) => {
        this.singleComment = res;
        if (this.singleComment != undefined) {
          this.editCommentForm = this.FB.group({
            Body: this.singleComment.Body,
          });
        }
      });
  }

  updateComment() {
    this.commentService.editComment(
      this.postID,
      this.commentID,
      this.editCommentForm.value.Body,
      this.AUTHId
    );

    this.editCommentForm = this.FB.group({
      Body: '',
    });
  }

  open(content) {
    this.model
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
