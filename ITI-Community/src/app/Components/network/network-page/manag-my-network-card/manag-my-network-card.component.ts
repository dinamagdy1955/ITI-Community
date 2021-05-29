import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { NetworkService } from '../../Services/network.service';

@Component({
  selector: 'app-manag-my-network-card',
  templateUrl: './manag-my-network-card.component.html',
  styleUrls: ['./manag-my-network-card.component.scss'],
})
export class ManagMyNetworkCardComponent implements OnInit, OnDestroy {
  frindsList: any[] = [];
  selectedLang: string;
  groups: any[] = [];
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  constructor(
    public translateService: TranslateService,
    private usrs: NetworkService, private us: UserService) {
      translateService.addLangs(['en', 'ar']);
      if (
        localStorage.getItem('lang') == undefined ||
        localStorage.getItem('lang') == 'en'
      ) {
        translateService.use('en');
        localStorage.setItem('lang', 'en');
        this.selectedLang='en'
        // document.dir = 'ltr';
      } else if (localStorage.getItem('lang') == 'ar') {
        translateService.use('ar');
        localStorage.setItem('lang', 'ar');
        this.selectedLang='ar'
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
    let sub1 = this.usrs.getAllFriendsList(this.uid).subscribe((data) => {
      this.frindsList = data.map((e) => {
        return e.payload.doc.id;
      });
    });
    this.subscription.push(sub1);
    let sub2 = this.us.getUserData(this.uid).subscribe((res) => {
      this.groups = res.payload.get('groups');
    });
    this.subscription.push(sub2);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
