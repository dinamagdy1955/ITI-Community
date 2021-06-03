import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { HomePostsService } from '../home-page/HomeServices/home-posts.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit,OnDestroy {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  counter: number = 0;
  limits:number=8;
  selectedLang: string;
  notificationsCount: BehaviorSubject<number>;
  public isCollapsed = false;
  Notifications: any[] = [];
  uid;
  avatar;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(
    public translateService: TranslateService,
    private homePostServ: HomePostsService,
     private us: UserService) {
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
    this.notificationsCount = new BehaviorSubject<number>(5);
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
        this.avatar = res.avatar;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
   let sub2= this.homePostServ.getAllNotifications(this.uid,this.limits)
   .subscribe((data) => {
      this.Notifications = data.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
          doc:e.payload.doc
        };
      });
    });
    this.subscription.push(sub2);
  }

  onScrollDown () { 
    this.limits+=5;

    let sub3=this.homePostServ.getAllNotifications(this.uid,this.limits )
    .subscribe((data) => {
      this.Notifications = data.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
          doc:e.payload.doc
        };
      });
    });
      
      this.subscription.push(sub3);


 
}
  DeleteNotification(postid) {
    this.homePostServ.DeleteNotification(postid, this.uid);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
