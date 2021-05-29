import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { NetworkService } from '../Services/network.service';

@Component({
  selector: 'app-invitations-page',
  templateUrl: './invitations-page.component.html',
  styleUrls: ['./invitations-page.component.scss'],
})
export class InvitationsPageComponent implements OnInit, OnDestroy {
  invitaions: any[] = [];
  selectedLang: string;
  keyWordsSearch;
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
      private us: UserService
      ) {
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
    let sub = this.usrs.getAllFriendRequests(this.uid).subscribe((data) => {
      this.invitaions = data.map((e) => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          avatar: e.payload.doc.data()['avatar'],
          avatarCover: e.payload.doc.data()['avatarCover'],
          addedDate: e.payload.doc.data()['addedDate'],
        };
      });
    });
    this.subscription.push(sub);
  }

  sortRecently() {
    this.invitaions = this.invitaions.sort((a, b) => {
      const date1 = a.addedDate;
      const date2 = b.addedDate;
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0;
    });
  }

  sortFirstName() {
    this.invitaions = this.invitaions.sort((a, b) => {
      const name1 = a.firstName.toLowerCase();
      const name2 = b.firstName.toLowerCase();
      if (name1 > name2) {
        return 1;
      }
      if (name1 < name2) {
        return -1;
      }
      return 0;
    });
  }

  sortLastName() {
    this.invitaions = this.invitaions.sort((a, b) => {
      const name1 = a.lastName.toLowerCase();
      const name2 = b.lastName.toLowerCase();
      if (name1 > name2) {
        return 1;
      }
      if (name1 < name2) {
        return -1;
      }
      return 0;
    });
  }

  IgnoreRequest(id) {
    this.usrs.ignore(id, this.uid);
  }

  AcceptRequest(item) {
    this.usrs.AcceptRequest(item, this.uid, {
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
