import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnChanges {
  constructor(private router: Router) {
    if (localStorage.getItem('userToken') == undefined) {
      this.router.navigate(['/Login']);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}
}
