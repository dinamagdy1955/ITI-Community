import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  text = 'Go to Home';
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('userToken') == undefined)
      this.text = 'Go to Login';
    else this.text = 'Go to Home';
  }

  navigate() {
    if (localStorage.getItem('userToken') == undefined)
      this.router.navigate(['/Login']);
    else this.router.navigate(['/Home']);
  }
}
