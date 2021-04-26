import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {
    if (localStorage.getItem('userToken') == undefined) {
      this.router.navigate(['/Login']);
    }
  }

  ngOnInit(): void { }
}
