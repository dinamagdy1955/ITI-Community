import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../network/Services/network.service';

@Component({
  selector: 'app-home-profile-card',
  templateUrl: './home-profile-card.component.html',
  styleUrls: ['./home-profile-card.component.scss'],
})
export class HomeProfileCardComponent implements OnInit {
  myData: any;
  frindsList: any[] = [];
  Requests: any[] = [];
  constructor(private usrs: NetworkService) {}

  ngOnInit(): void {
    this.myData = {
      id: localStorage.getItem('uid'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      jobTitle: localStorage.getItem('jobTitle'),
      avatar: localStorage.getItem('avatar'),
      avatarCover: localStorage.getItem('avatarCover'),
    };
    this.usrs.getAllFriendsList(this.myData.id).subscribe((data) => {
      this.frindsList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          avatar: e.payload.doc.data()['avatar'],
        };
      });
      this.usrs.getAllFriendRequests(this.myData.id).subscribe((data) => {
        this.Requests = data.map((e) => {
          return e.payload.doc.id;
        });
      });
    });
  }
}
