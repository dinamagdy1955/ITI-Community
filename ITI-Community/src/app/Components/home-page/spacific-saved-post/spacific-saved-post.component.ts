import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-spacific-saved-post',
  templateUrl: './spacific-saved-post.component.html',
  styleUrls: ['./spacific-saved-post.component.scss'],
})
export class SpacificSavedPostComponent implements OnInit {
  post: any;
  selectedLang: string;
  id;
  uid;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(
    public translateService: TranslateService,
    private _Activatedroute: ActivatedRoute,
    private postsServ: HomePostsService,
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

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.postsServ.MyPostById(this.id, this.uid).subscribe((data) => {
      this.post = data.payload.data();
    });
  }

  Like(uid, pid, autID) {
    this.postsServ.giveLike(uid, pid, autID);
  }
  deletePost(pid, post) {
    this.postsServ.deletePost(pid, post, this.uid);
  }
  spamPost(pid, post) {
    this.postsServ.SpamPost(pid, post, this.uid);
  }
  SavePost(pid, post) {
    this.postsServ.SavePosts(pid, post, this.uid);
  }
  ReportPost(pid, post) {
    this.postsServ.ReportPost(pid, post, this.uid);
  }
}
