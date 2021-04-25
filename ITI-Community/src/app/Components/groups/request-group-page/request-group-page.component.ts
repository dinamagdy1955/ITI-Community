import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GroupService } from '../Services/group.service';
import { IGroup } from '../ViewModel/igroup';

@Component({
  selector: 'app-request-group-page',
  templateUrl: './request-group-page.component.html',
  styleUrls: ['./request-group-page.component.scss']
})
export class RequestGroupPageComponent implements OnInit {

  GroupList: IGroup[];
  constructor(private GrpServ: GroupService) { }

  ngOnInit(): void {
    this.GrpServ.getAllGroups().subscribe((resp) => {
      this.GroupList = resp.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as IGroup
      })
    })
  }
}
