import { Component } from '@angular/core';
import {
  NavigationStart,
  Router,
  Event as RouterEvent,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ITI-Community';
  showHead: boolean = false;
  loader: boolean = true;
  constructor(private router: Router) {
    if (localStorage.getItem('lang') == 'en') {
      document.dir = 'ltr';
    } else if (localStorage.getItem('lang') == 'ar') {
      document.dir = 'rtl';
    }

    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] == '/Login' ||
          event['url'] == '/Register/User' ||
          event['url'] == '/jobs/specificjob'
        ) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader = true;
    }
    if (event instanceof NavigationEnd) {
      this.loader = false;
    }
    if (event instanceof NavigationCancel) {
      this.loader = false;
    }
    if (event instanceof NavigationError) {
      this.loader = false;
    }
  }
}
