import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../Services/network.service';

@Component({
  selector: 'app-invitations-page',
  templateUrl: './invitations-page.component.html',
  styleUrls: ['./invitations-page.component.scss'],
})
export class InvitationsPageComponent implements OnInit {
  invitaions: any[] = [];
  keyWordsSearch;
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
            avatarCover: e.payload.doc.data()['avatarCover'],
            addedDate: e.payload.doc.data()['addedDate'],
          };
        });
        console.log(this.invitaions )
      });
  }

  sortRecently() {
    this.invitaions = this.invitaions.sort((a, b) => {
      const date1 = a.addedDate;
      const date2 = b.addedDate;
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0;
    });
  }

  sortFirstName() {
    this.invitaions = this.invitaions.sort((a, b) => {
      const name1 = a.firstName.toLowerCase();
      const name2 = b.firstName.toLowerCase();
      if (name1 > name2) {
        return 1;
      }
      if (name1 < name2) {
        return -1;
      }
      return 0;
    });
  }

  sortLastName() {
    this.invitaions = this.invitaions.sort((a, b) => {
      const name1 = a.lastName.toLowerCase();
      const name2 = b.lastName.toLowerCase();
      if (name1 > name2) {
        return 1;
      }
      if (name1 < name2) {
        return -1;
      }
      return 0;
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
