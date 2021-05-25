import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NetworkService } from 'src/app/Components/network/Services/network.service';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.scss'],
})
export class ProfileSideComponent implements OnInit, OnDestroy {
  @Input() uid;
  uidLocal = undefined;
  friendList = [];
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(private network: NetworkService, private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uidLocal = res.id;
      }
      let sub1 = this.network
        .getAllFriendsList(this.uidLocal)
        .subscribe((res) => {
          this.friendList = res.map((e) => {
            return {
              id: e.payload.doc.id,
              firstName: e.payload.doc.data()['firstName'],
              lastName: e.payload.doc.data()['lastName'],
              jobTitle: e.payload.doc.data()['jobTitle'],
              avatar: e.payload.doc.data()['avatar'],
            };
          });
        });
      this.subscription.push(sub1);
    });
    this.subscription.push(sub);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
