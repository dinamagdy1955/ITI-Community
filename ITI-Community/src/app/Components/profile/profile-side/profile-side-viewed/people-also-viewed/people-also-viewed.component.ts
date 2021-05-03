import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-also-viewed',
  templateUrl: './people-also-viewed.component.html',
  styleUrls: ['./people-also-viewed.component.scss'],
})
export class PeopleAlsoViewedComponent implements OnInit {
  @Input() Friend;
  constructor() {}

  ngOnInit() {}
}
