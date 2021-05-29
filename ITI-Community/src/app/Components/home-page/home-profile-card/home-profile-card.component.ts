import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../network/Services/network.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home-profile-card',
  templateUrl: './home-profile-card.component.html',
  styleUrls: ['./home-profile-card.component.scss'],
})
export class HomeProfileCardComponent implements OnInit {
  selectedLang: string;
  myData: any;
  frindsList: any[] = [];
  Requests: any[] = [];
  uid;
  firstName;
  lastName;
  jobTitle;
  avatar;
  avatarCover;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor( public translateService: TranslateService,private usrs: NetworkService, private us: UserService) 
  {
    translateService.addLangs(['en', 'ar']);
    if (
      localStorage.getItem('lang') == undefined ||
      localStorage.getItem('lang') == 'en'
    ) {
      translateService.use('en');
      localStorage.setItem('lang', 'en');
      // document.dir = 'ltr';
    } else if (localStorage.getItem('lang') == 'ar') {
      translateService.use('ar');
      localStorage.setItem('lang', 'ar');
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
    this.myData = {
      id: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      jobTitle: this.jobTitle,
      avatarCover: this.avatarCover,
    };
    this.usrs.getAllFriendsList(this.myData.id).subscribe((data) => {
      this.frindsList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          avatar: e.payload.doc.data()['avatar'],
        };
      });
      this.usrs.getAllFriendRequests(this.myData.id).subscribe((data) => {
        this.Requests = data.map((e) => {
          return e.payload.doc.id;
        });
      });
    });
  }


}
