import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-side-viewed',
  templateUrl: './profile-side-viewed.component.html',
  styleUrls: ['./profile-side-viewed.component.scss'],
})
export class ProfileSideViewedComponent implements OnInit {
  uid = localStorage.getItem('uid');
  constructor() {}

  ngOnInit() {}
}
