import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GroupService } from '../Services/group.service';
import { IGroup } from '../ViewModel/igroup';

@Component({
  selector: 'app-right-side-group',
  templateUrl: './right-side-group.component.html',
  styleUrls: ['./right-side-group.component.scss']
})
export class RightSideGroupComponent implements OnInit, OnDestroy {

  Group: IGroup;
  GroupId: string;
  private subscription: Subscription[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private GrpServ: GroupService,
    private modalService: NgbModal
  ) { }



  ngOnInit(): void {
    let param = this.activeRoute.paramMap.subscribe((params) => {
      this.GroupId = params.get('id');
      this.GrpServ.getGrpById(this.GroupId).subscribe(res => {
        this.Group = res;
      })
    })
    this.subscription.push(param);
  }

  ngOnDestroy(): void {
    for (let subs of this.subscription) {
      subs.unsubscribe();
    }
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
