import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/Components/network/Services/network.service';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.scss'],
})
export class ProfileSideComponent implements OnInit {
  @Input() uid;
  uidLocal = localStorage.getItem('uid');
  friendList = [];
  constructor(private network: NetworkService) {
    let sub = this.network.getAllFriendsList(this.uidLocal).subscribe((res) => {
      this.friendList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          avatar: e.payload.doc.data()['avatar'],
        };
      });
      sub.unsubscribe();
    });
  }

  ngOnInit() {}
}
