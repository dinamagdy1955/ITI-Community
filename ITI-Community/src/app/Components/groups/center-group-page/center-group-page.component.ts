import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup } from '../ViewModel/igroup';

@Component({
  selector: 'app-center-group-page',
  templateUrl: './center-group-page.component.html',
  styleUrls: ['./center-group-page.component.scss']
})
export class CenterGroupPageComponent implements OnInit, OnDestroy {

  Group: IGroup;
  GroupId: string;
  private subscription: Subscription[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private GrpServ: GroupService,
  ) { }

  ngOnInit(): void {
    let param = this.activeRoute.paramMap.subscribe((params) => {
      this.GroupId = params.get('id');
      this.GrpServ.getGrpById(this.GroupId).subscribe(res => {
        this.Group = res;
      })
    })
    this.subscription.push(param)
  }
  ngOnDestroy(): void {
    for (let subs of this.subscription) {
      subs.unsubscribe()
    }
  }
}
