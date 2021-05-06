import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-profile-side-viewed',
  templateUrl: './profile-side-viewed.component.html',
  styleUrls: ['./profile-side-viewed.component.scss'],
})
export class ProfileSideViewedComponent implements OnInit {
  uid = localStorage.getItem('uid');
  friendList = [];
  constructor(private us: UserService) {
    let sub = this.us.getUserData(this.uid).subscribe((res) => {
      if (res.payload.data()['friendList'] > 0) {
        let sub2 = this.us
          .getUserDataList(res.payload.data()['friendList'])
          .subscribe((e) => {
            console.log('e', e.docs);
            e.docs.map((f) => {
              console.log('f', f);
              this.friendList.push({
                id: f.id,
                data: f.data(),
              });
            });
            sub2.unsubscribe();
          });
      }
      sub.unsubscribe();
    });
  }

  ngOnInit() {}
}
