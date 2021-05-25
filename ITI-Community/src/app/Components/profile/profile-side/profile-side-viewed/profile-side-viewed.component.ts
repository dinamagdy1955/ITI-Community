import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NetworkService } from 'src/app/Components/network/Services/network.service';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-profile-side-viewed',
  templateUrl: './profile-side-viewed.component.html',
  styleUrls: ['./profile-side-viewed.component.scss'],
})
export class ProfileSideViewedComponent implements OnInit, OnDestroy {
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  @Input() friendList;
  constructor(private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
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
