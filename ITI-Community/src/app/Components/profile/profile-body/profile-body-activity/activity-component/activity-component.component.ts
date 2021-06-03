import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-component',
  templateUrl: './activity-component.component.html',
  styleUrls: ['./activity-component.component.scss'],
})
export class ActivityComponentComponent implements OnInit {
  @Input() post;
  constructor() {}

  ngOnInit() {}
}
