import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../network/Services/network.service';

@Component({
  selector: 'app-home-add-to-your-feed',
  templateUrl: './home-add-to-your-feed.component.html',
  styleUrls: ['./home-add-to-your-feed.component.scss'],
})
export class HomeAddToYourFeedComponent implements OnInit {
  usersData: any[] = [];
  constructor(private usrs: NetworkService) {}

  ngOnInit(): void {
    let friendData: any[];
    let Requests: any[];
    let SentfriendRequest: any[];
    let uid = localStorage.getItem('uid');
    this.usrs.getAllFriendRequests(uid).subscribe((data) => {
      Requests = data.map((e) => {
        let id = e.payload.doc.id;
        return id;
      });
      console.log(Requests);

      this.usrs.getMySentfriendRequests(uid).subscribe((data) => {
        SentfriendRequest = data.map((e) => {
          return e.payload.doc.id;
        });

        this.usrs.getAllFriendsList(uid).subscribe((data) => {
          friendData = data.map((e) => {
            // if(e.payload.doc.id)
            let id = e.payload.doc.id;
            return id;
          });
         // console.log(friendData);

          this.usrs
            .notINCard(Requests.concat(friendData, SentfriendRequest), uid)
            .subscribe((data) => {
              this.usersData = data.map((e) => {
                return {
                  id: e.payload.doc.id,
                  firstName:
                    e.payload.doc.data()['firstName'] +
                    ' ' +
                    e.payload.doc.data()['lastName'],
                  jobTitle: e.payload.doc.data()['jobTitle'],
                  avatar: e.payload.doc.data()['avatar'],
                  avatarCover: e.payload.doc.data()['avatarCover'],
                };
              });
            //  console.log(friendData);
            });
        });
      });
    });
  }

  sendRequest(item) {
    this.usrs.create_NewRequest(item, {
      id: localStorage.getItem('uid'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      avatar: localStorage.getItem('avatar'),
      avatarCover: localStorage.getItem('avatarCover'),
      jobTitle: localStorage.getItem('jobTitle'),
    });
  }
}
