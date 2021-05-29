import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { NetworkService } from '../../Services/network.service';

@Component({
  selector: 'app-sent-requestes-card',
  templateUrl: './sent-requestes-card.component.html',
  styleUrls: ['./sent-requestes-card.component.scss'],
})
export class SentRequestesCardComponent implements OnInit, OnDestroy {
  sentRequests: any[] = [];
  RequestsinCardData: any[];
  selectedLang: string;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  constructor(
    public translateService: TranslateService,
    private usrs: NetworkService,
     private us: UserService) {
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
    let sub = this.usrs.getMySentfriendRequests(this.uid).subscribe((data) => {
      this.sentRequests = data.map((e) => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          avatar: e.payload.doc.data()['avatar'],
          avatarCover: e.payload.doc.data()['avatarCover'],
        };
      });
    });
    this.subscription.push(sub);
  }

  cancelRequest(req) {
    this.usrs.deleteSentFriendReq(req, this.uid);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
