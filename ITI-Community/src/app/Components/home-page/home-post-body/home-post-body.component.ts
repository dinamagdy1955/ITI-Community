import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { TranslateService } from '@ngx-translate/core';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home-post-body',
  templateUrl: './home-post-body.component.html',
  styleUrls: ['./home-post-body.component.scss'],
})
export class HomePostBodyComponent implements OnInit, OnDestroy {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  location = window.location.origin;
  direction = '';
  counter: number = 0;
  limits: number = 5;
  postsCount: BehaviorSubject<number>;
  @ViewChild('pRef') pRef: ElementRef;
  selectedLang: string;
  MyPosts: any[] = [];
  frindsList: any[] = [];
  MyFriendsPosts: any[] = [];
  AllPosts: any[] = [];
  flag = false;
  x = 400;
  uid;
  avatar;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    public translateService: TranslateService,
    private homePostServ: HomePostsService,
    private us: UserService,
    public commentService: HPostCommentService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.postsCount = new BehaviorSubject<number>(5);
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
        this.avatar = res.avatar;
      }
    });

    this.subscription.push(sub);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  open(content) {
    this.modalService.open(content);
  }

  identify(index, post) {
    return post.id;
  }
  ngOnInit(): void {
    // this.AllPosts=[];
    let sub2 = this.homePostServ
      .getAllMyPosts(this.uid, this.limits)
      .subscribe((data) => {
        this.AllPosts = data.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        this.subscription.push(sub2);
      });
  }

  onScrollDown() {
    this.limits += 5;

    // this.AllPosts[this.AllPosts.length - 1].doc;
    let sub3 = this.homePostServ
      .getAllMyPosts(this.uid, this.limits)
      .subscribe((res) => {
        this.AllPosts = res.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        // sub3.unsubscribe()

        //   res.map((e) => {

        //     this.AllPosts.push({
        //       id: e.payload.doc.id,
        //       data: e.payload.doc.data(),
        //       doc:e.payload.doc
        //     });
        //   });
        this.subscription.push(sub3);
      });
  }

  deletePost(pid, post) {
    this.homePostServ.deletePost(pid, post, this.uid);
  }
  spamPost(pid, post) {
    this.homePostServ.SpamPost(pid, post, this.uid);
  }
  SavePost(pid, post) {
    this.homePostServ.SavePosts(pid, post, this.uid);
  }

  Like(uid, pid, autID) {
    this.homePostServ.giveLike(uid, pid, autID);
  }

  ReportPost(pid, post) {
    this.homePostServ.ReportPost(pid, post, this.uid);
  }
  seeAllContent() {
    this.x = 1000;
  }
}
