import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-left-side-group',
  templateUrl: './left-side-group.component.html',
  styleUrls: ['./left-side-group.component.scss']
})
export class LeftSideGroupComponent implements OnInit, OnDestroy {
  userID: string
  userData
  subscripion: Subscription[] = []
  constructor(private user: UserService) {
    this.userID = localStorage.getItem('uid');
  }

  ngOnInit(): void {
    let sub1 = this.user.getUserData(this.userID).subscribe((res) => {
      this.userData = res.payload.data()
    })
    this.subscripion.push(sub1)
  }

  ngOnDestroy(): void {
    for (let i of this.subscripion) {
      i.unsubscribe();
    }
  }


}
