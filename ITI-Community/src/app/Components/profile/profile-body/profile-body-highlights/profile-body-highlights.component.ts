import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-body-highlights',
  templateUrl: './profile-body-highlights.component.html',
  styleUrls: ['./profile-body-highlights.component.scss'],
})
export class ProfileBodyHighlightsComponent implements OnInit {
  @Input() firstName;
  uid = localStorage.getItem('uid');
  constructor() {}

  ngOnInit() {}
}
