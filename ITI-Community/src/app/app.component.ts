import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ITI-Community';
  showHead: boolean = false;
  constructor(private router: Router) {
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
  }
}
