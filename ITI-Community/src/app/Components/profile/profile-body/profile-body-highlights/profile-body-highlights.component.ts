import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-profile-body-highlights',
  templateUrl: './profile-body-highlights.component.html',
  styleUrls: ['./profile-body-highlights.component.scss'],
})
export class ProfileBodyHighlightsComponent implements OnInit, OnDestroy {
  @Input() firstName;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
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
