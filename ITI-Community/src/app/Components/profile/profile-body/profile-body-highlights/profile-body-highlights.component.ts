import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatsService } from 'src/app/Components/messages/Service/chats.service';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-profile-body-highlights',
  templateUrl: './profile-body-highlights.component.html',
  styleUrls: ['./profile-body-highlights.component.scss'],
})
export class ProfileBodyHighlightsComponent implements OnInit, OnDestroy {
  @Input() user;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  userLocal;
  constructor(private us: UserService, private chat: ChatsService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
        this.userLocal = res;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit() {}
  openChat(logged, reci) {
    this.chat.newChat(logged, reci);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
