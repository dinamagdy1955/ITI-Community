import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupService } from '../Services/group.service';
import { IGroup } from '../ViewModel/igroup';

@Component({
  selector: 'app-request-group-page',
  templateUrl: './request-group-page.component.html',
  styleUrls: ['./request-group-page.component.scss']
})
export class RequestGroupPageComponent implements OnInit, OnDestroy {

  GroupList: IGroup[];
  userID: string
  subscription: Subscription[] = []
  constructor(private GrpServ: GroupService) { }


  ngOnInit(): void {
    this.userID = localStorage.getItem('uid')
    let sub = this.GrpServ.getAllGroups().subscribe((resp) => {
      this.GroupList = resp.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as IGroup
      })
    })
    this.subscription.push(sub)
  }

  JoinOut(user, id) {
    this.GrpServ.DeleteMembers(user, id)
  }

  ngOnDestroy(): void {
    for (let i of this.subscription) {
      i.unsubscribe();
    }
  }
}
