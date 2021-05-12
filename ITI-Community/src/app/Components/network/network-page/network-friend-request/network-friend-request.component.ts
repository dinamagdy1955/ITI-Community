import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../Services/network.service';

@Component({
  selector: 'app-network-friend-request',
  templateUrl: './network-friend-request.component.html',
  styleUrls: ['./network-friend-request.component.scss'],
})
export class NetworkFriendRequestComponent implements OnInit {
  Requests: any[] = [];
  constructor(private usrs: NetworkService) {}

  ngOnInit(): void {
    this.usrs
      .getAllFriendRequests(localStorage.getItem('uid'))
      .subscribe((data) => {
        this.Requests = data.map((e) => {
          return {
            id: e.payload.doc.id,
            firstName: e.payload.doc.data()['firstName'],
            lastName: e.payload.doc.data()['lastName'],
            jobTitle: e.payload.doc.data()['jobTitle'],
            reqState: e.payload.doc.data()['reqState'],
            avatar: e.payload.doc.data()['avatar'],
            avatarCover: e.payload.doc.data()['avatarCover'],
            addedDate: e.payload.doc.data()['addedDate'],
          };
        });
        console.log(this.Requests);
      });
  }

  IgnoreRequest(id) {
    this.usrs.ignore(id, localStorage.getItem('uid'));
  }

  AcceptRequest(item) {
    this.usrs.AcceptRequest(item, localStorage.getItem('uid'), {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      avatar: localStorage.getItem('avatar'),
      avatarCover: localStorage.getItem('avatarCover'),
      jobTitle: localStorage.getItem('jobTitle'),
    });
  }
}
