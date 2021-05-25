import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupService } from '../../groups/Services/group.service';

@Component({
  selector: 'app-home-dropdowen',
  templateUrl: './home-dropdowen.component.html',
  styleUrls: ['./home-dropdowen.component.scss'],
})
export class HomeDropdowenComponent implements OnInit {
  groups: any[] = [];
  counter = 0;
  uid;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(private us: UserService, private gp: GroupService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.us.getUserData(this.uid).subscribe((res) => {
      this.counter = 0;
      res.payload.get('groups').map((grp) => {
        if (this.counter < 5)
          this.gp.getGrpById(grp).subscribe((e) => {
            this.groups.push({
              id: grp,
              data: e,
            });
          });
      });
    });
  }
}
