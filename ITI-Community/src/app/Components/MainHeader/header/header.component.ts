import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { SignInService } from '../../login/signInService/sign-in.service';
import { UserProfileService } from '../../profile/Service/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  Lang: string;
  toggleStatus: boolean = false;
  public isMenuCollapsed = true;
  data: Observable<any>;
  uid: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: string;
  subscription: Subscription[] = [];

  constructor(
    public translateService: TranslateService,
    private auth: SignInService,
    private us: UserService
  ) {
    translateService.addLangs(['en', 'ar']);
    if (
      localStorage.getItem('lang') == undefined ||
      localStorage.getItem('lang') == 'en'
    ) {
      translateService.use('en');
      localStorage.setItem('lang', 'en');
    } else if (localStorage.getItem('lang') == 'ar') {
      translateService.use('ar');
      localStorage.setItem('lang', 'ar');
    }

    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang');
  }

  toggleSideBar() {
    this.toggleStatus = !this.toggleStatus;
  }
  async signOut() {
    await this.auth.logout();
  }

  translateSite(language: string) {
    localStorage.setItem('lang', language);
    this.translateService.use(language);
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
