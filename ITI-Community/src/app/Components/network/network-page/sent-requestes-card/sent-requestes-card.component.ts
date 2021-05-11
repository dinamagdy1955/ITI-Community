import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../Services/network.service';

@Component({
  selector: 'app-sent-requestes-card',
  templateUrl: './sent-requestes-card.component.html',
  styleUrls: ['./sent-requestes-card.component.scss'],
})
export class SentRequestesCardComponent implements OnInit {
  sentRequests: any[] = [];
  RequestsinCardData: any[];
  constructor(private usrs: NetworkService) {}

  ngOnInit(): void {
    this.usrs
      .getMySentfriendRequests(localStorage.getItem('uid'))
      .subscribe((data) => {
        this.sentRequests = data.map((e) => {
          return {
            id: e.payload.doc.id,
            firstName: e.payload.doc.data()['firstName'],
            lastName: e.payload.doc.data()['lastName'],
            jobTitle: e.payload.doc.data()['jobTitle'],
            avatar: e.payload.doc.data()['avatar'],
            avatarCover: e.payload.doc.data()['avatarCover'],
          };
        });
        console.log(this.sentRequests);
      });
  }

  cancelRequest(req) {
    this.usrs.deleteSentFriendReq(req, localStorage.getItem('uid'));
  }
}
