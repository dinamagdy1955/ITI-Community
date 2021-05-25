import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { HomePostsService } from '../home-page/HomeServices/home-posts.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  public isCollapsed = false;
  Notifications: any[] = [];
  uid;
  avatar;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(private homePostServ: HomePostsService, private us: UserService) {
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
    this.homePostServ.getAllNotifications(this.uid).subscribe((data) => {
      console.log(data);
      this.Notifications = data.map((e) => {
        console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
      console.log(this.Notifications);
    });
  }
  DeleteNotification(postid) {
    this.homePostServ.DeleteNotification(postid, this.uid);
  }
}
