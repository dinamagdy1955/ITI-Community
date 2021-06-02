import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HomePostsService } from 'src/app/Components/home-page/HomeServices/home-posts.service';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-profile-body-activity',
  templateUrl: './profile-body-activity.component.html',
  styleUrls: ['./profile-body-activity.component.scss'],
})
export class ProfileBodyActivityComponent implements OnInit {
  @Input() user;
  subscriptions: Subscription[] = [];
  userID;
  data: Observable<any>;
  homePosts = [];
  constructor(
    private us: UserService,
    private homePostsServ: HomePostsService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnInit() {
    let sub = this.homePostsServ.getMyPosts(this.user).subscribe((res) => {
      this.homePosts = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    });
    this.subscriptions.push(sub);
  }
}
