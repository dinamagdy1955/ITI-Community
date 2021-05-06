import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
})
export class MainProfileComponent implements OnInit {
  uid;
  constructor(private actvRout: ActivatedRoute) {}

  ngOnInit() {
    this.actvRout.paramMap.subscribe((params) => {
      this.uid = params.get('id');
    });
  }
}
