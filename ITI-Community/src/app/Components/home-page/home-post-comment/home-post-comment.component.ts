import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';
import { UserService } from 'src/app/MainServices/User.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-post-comment',
  templateUrl: './home-post-comment.component.html',
  styleUrls: ['./home-post-comment.component.scss'],
})
export class HomePostCommentComponent implements OnInit {
  @Input() PostID: string;
  @Input() admins;
  @Input() AUTHId: string;
  subscription: Subscription[] = [];
  selectedLang: string;
  getComments = [];
  uid;
  turnOff: boolean = false;
  counter: number = 0;
  data: Observable<any>;
  constructor(
    public translateService: TranslateService,
    public commentService: HPostCommentService,
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
  }
  identify(index, c) {
    return c.id;
  }
  ngOnInit(): void {
    let sub = this.commentService
      .getPostComments2(this.PostID, this.uid)
      .subscribe((res) => {
        this.getComments = res.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as object),
            doc: e.payload.doc,
          };
        });
        this.hideBtn(res);
      });
    this.subscription.push(sub);
  }

  hideBtn(res) {
    if (
      (res.length % 5 != 0 && res.length - this.counter == 0) ||
      res.length % 5 != 0 ||
      res.length == 0
    ) {
      this.turnOff = true;
    } else {
      this.turnOff = false;
    }
  }

  loadMore() {
    this.counter += 5;
    let param = this.getComments[this.getComments.length - 1].doc;
    this.commentService
      .getPostComments2(this.PostID, this.uid, param)
      .subscribe((res) => {
        res.map((e) => {
          this.getComments.push({
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as object),
            doc: e.payload.doc,
          });
        });
        this.hideBtn(res);
      });
  }

  deleteComment(Cid, postId) {
    this.commentService.deleteComment(Cid, postId, this.AUTHId);
  }
}
