import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../Services/network.service';

@Component({
  selector: 'app-invitations-page',
  templateUrl: './invitations-page.component.html',
  styleUrls: ['./invitations-page.component.scss'],
})
export class InvitationsPageComponent implements OnInit {
  invitaions: any[] = [];
  constructor(private usrs: NetworkService) {}

  ngOnInit(): void {
    this.usrs
      .getAllFriendRequests(localStorage.getItem('uid'))
      .subscribe((data) => {
        this.invitaions = data.map((e) => {
          return {
            id: e.payload.doc.id,
            firstName: e.payload.doc.data()['firstName'],
            lastName: e.payload.doc.data()['lastName'],
            jobTitle: e.payload.doc.data()['jobTitle'],
            avatar: e.payload.doc.data()['avatar'],
          };
        });
      });
  }

  DeleteInvitation(invit) {
    this.usrs.deleteInvitation(invit);
  }
}
