import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-profile-page',
  templateUrl: './group-profile-page.component.html',
  styleUrls: ['./group-profile-page.component.scss']
})

export class GroupProfilePageComponent implements OnInit, OnDestroy {
  GroupId: string
  constructor(private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.GroupId = params.get('id')
    })
  }
  ngOnDestroy(): void {

  }

}
