import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserProfileService } from '../../profile/Service/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})



export class HeaderComponent implements OnInit {
  selectedLang: string
  toggleStatus: boolean = false;
  public isMenuCollapsed = true;
  uid = localStorage.getItem('uid');
  firstName: string = localStorage.getItem('firstName');
  lastName: string = localStorage.getItem('lastName');
  jobTitle: string = localStorage.getItem('jobTitle');
  avatar: string = localStorage.getItem('avatar');

  constructor(
    private router: Router,
    private userProfile: UserProfileService,
    public translateService: TranslateService
  ) {
    translateService.addLangs(['en', 'ar']);
    if (localStorage.getItem('lang') == undefined || localStorage.getItem('lang') == 'en') {
      translateService.use('en')
      localStorage.setItem('lang', 'en')
      // document.dir = 'ltr';
    } else if (localStorage.getItem('lang') == 'ar') {
      translateService.use('ar')
      localStorage.setItem('lang', 'ar')
      // document.dir = 'rtl';
    }
  }

  ngOnInit(): void { }

  toggleSideBar() {
    this.toggleStatus = !this.toggleStatus;
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }

  translateSite(language: string) {
    localStorage.setItem('lang', language)
    this.translateService.use(language);
    window.location.reload();
  }
}
