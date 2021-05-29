import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../network/Services/network.service';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-add-to-your-feed',
  templateUrl: './home-add-to-your-feed.component.html',
  styleUrls: ['./home-add-to-your-feed.component.scss'],
})
export class HomeAddToYourFeedComponent implements OnInit {
  selectedLang: string;
  usersData: any[] = [];
  uid;
  firstName;
  lastName;
  jobTitle;
  avatar;
  avatarCover;
  data: Observable<any>;
  subscription: Subscription[] = [];
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
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
        this.avatarCover = res.avatarCover;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    let friendData: any[];
    let Requests: any[];
    let SentfriendRequest: any[];
    this.usrs.getAllFriendRequests(this.uid).subscribe((data) => {
      Requests = data.map((e) => {
        let id = e.payload.doc.id;
        return id;
      });

      this.usrs.getMySentfriendRequests(this.uid).subscribe((data) => {
        SentfriendRequest = data.map((e) => {
          return e.payload.doc.id;
        });

        this.usrs.getAllFriendsList(this.uid).subscribe((data) => {
          friendData = data.map((e) => {
            let id = e.payload.doc.id;
            return id;
          });
          this.usrs
            .notINCard(Requests.concat(friendData, SentfriendRequest), this.uid)
            .subscribe((data) => {
              this.usersData = data.map((e) => {
                return {
                  id: e.payload.doc.id,
                  firstName:
                    e.payload.doc.data()['firstName'] +
                    ' ' +
                    e.payload.doc.data()['lastName'],
                  jobTitle: e.payload.doc.data()['jobTitle'],
                  avatar: e.payload.doc.data()['avatar'],
                  avatarCover: e.payload.doc.data()['avatarCover'],
                };
              });
            });
        });
      });
    });
  }

  sendRequest(item) {
    this.usrs.create_NewRequest(item, {
      id: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      avatarCover: this.avatarCover,
      jobTitle: this.jobTitle,
    });
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
