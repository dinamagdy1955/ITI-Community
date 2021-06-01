import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.scss'],
})
export class SavedPostsComponent implements OnInit,OnDestroy {
    throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  counter: number = 0;
  notificationsCount: BehaviorSubject<number>;
  savedPosts: any[] = [];
  selectedLang: string;
  uid;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(
    public translateService: TranslateService,
    private postsServ: HomePostsService,
    private us: UserService
  ) {
    this.notificationsCount = new BehaviorSubject<number>(5);
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
   let sub2= this.postsServ.getSavedPosts(this.uid).subscribe((data) => {
      this.savedPosts = data.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    }); this.subscription.push(sub2);
  }


  onScrollDown () { 
    this.counter += 5;
    let param = this.savedPosts[this.savedPosts.length - 1].doc;
    let sub3= this.postsServ.getSavedPosts(this.uid,param )
        .subscribe((res) => {
        res.map((e) => {
          this.savedPosts.push({
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
            doc:e.payload.doc
          });
        });
       
      }); this.subscription.push(sub3);

    this.notificationsCount.next(this.notificationsCount.value + 5);
 
}



  unsave(item) {
    this.postsServ.unSavePost(item, this.uid);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
//getSavedPosts
