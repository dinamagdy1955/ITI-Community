import { Component, OnInit } from '@angular/core';
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
  constructor(private us: UserService, private gp: GroupService) {}

  ngOnInit(): void {
    this.us.getUserData(localStorage.getItem('uid')).subscribe((res) => {
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
