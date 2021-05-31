import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { TranslateService } from '@ngx-translate/core';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';
@Component({
  selector: 'app-home-post-body',
  templateUrl: './home-post-body.component.html',
  styleUrls: ['./home-post-body.component.scss'],
})
export class HomePostBodyComponent implements OnInit {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  counter: number = 0;
  noPosts;
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
  constructor(
    public translateService: TranslateService,
    private homePostServ: HomePostsService,
    private us: UserService,
    public commentService: HPostCommentService
  ) {
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

  identify(index, post) {
    return post.id;
  }
  ngOnInit(): void {
    if (this.AllPosts.length == 0) {
      let sub = this.homePostServ
        .getAllMyPosts(this.uid, 5)
        .subscribe((data) => {
          sub.unsubscribe();
          this.counter += 5;
          this.AllPosts = data.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
              doc: e.payload.doc,
            };
          });
          this.noPosts = this.AllPosts.length;
        });
    } else {
      this.homePostServ
        .getAllMyPosts(this.uid, this.AllPosts.length)
        .subscribe((data) => {
          console.log('hello');

          data.map((e) => {
            let flag = false;
            this.AllPosts.find((post) => {
              if (post.id == e.payload.doc.id) {
                console.log('hello1');
                flag = true;
                post.id = e.payload.doc.id;
                post.data = e.payload.doc.data();
                post.doc = e.payload.doc;
              }
            });
            if (!flag)
              this.AllPosts.push({
                id: e.payload.doc.id,
                data: e.payload.doc.data(),
                doc: e.payload.doc,
              });
            this.AllPosts = this.AllPosts.sort((a, b) => {
              const date1 = a.data.PostedDate;
              const date2 = b.data.PostedDate;
              if (date1 > date2) {
                return -1;
              }
              if (date1 < date2) {
                return 1;
              }
              return 0;
            });
          });
          this.noPosts = this.AllPosts.length;
          console.log(this.AllPosts.length);
        });
    }
  }

  onScrollDown() {
    this.counter += 5;
    let param = this.AllPosts[this.AllPosts.length - 1].doc;
    let sub = this.homePostServ
      .getAllMyPosts(this.uid, 5, param)
      .subscribe((res) => {
        sub.unsubscribe();
        res.map((e) => {
          this.AllPosts.push({
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
            doc: e.payload.doc,
          });
        });
        this.noPosts = this.AllPosts.length;
      });

    this.postsCount.next(this.postsCount.value + 5);
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
