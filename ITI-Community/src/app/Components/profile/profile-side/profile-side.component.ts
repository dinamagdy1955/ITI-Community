import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.scss'],
})
export class ProfileSideComponent implements OnInit {
  @Input() uid;
  uidLocal = localStorage.getItem('uid');
  constructor() {}

  ngOnInit() {}
}
