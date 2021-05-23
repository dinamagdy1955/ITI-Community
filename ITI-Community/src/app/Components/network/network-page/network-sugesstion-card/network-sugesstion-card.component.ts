import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
//import { userInfo } from 'node:os';
import { NetworkService } from '../../Services/network.service';

@Component({
  selector: 'app-network-sugesstion-card',
  templateUrl: './network-sugesstion-card.component.html',
  styleUrls: ['./network-sugesstion-card.component.scss'],
})
export class NetworkSugesstionCardComponent implements OnInit {
  usersinCardData: any[];
  uid;
  firstName;
  lastName;
  jobTitle;
  avatar;
  avatarCover;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(private usrs: NetworkService, private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != undefined) {
        this.uid = res.id;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
        this.avatarCover = res.avatarCover;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    let friendData: any[];
    let Requests: any[];
    let SentfriendRequest: any[];

    let sub1 = this.usrs.getAllFriendRequests(this.uid).subscribe((data) => {
      Requests = data.map((e) => {
        return e.payload.doc.id;
      });

      let sub2 = this.usrs.getAllFriendsList(this.uid).subscribe((data) => {
        friendData = data.map((e) => {
          return e.payload.doc.id;
        });

        let sub3 = this.usrs
          .getMySentfriendRequests(this.uid)
          .subscribe((data) => {
            SentfriendRequest = data.map((e) => {
              return e.payload.doc.id;
            });

            let sub4 = this.usrs
              .notINCard(
                Requests.concat(friendData, SentfriendRequest),
                this.uid
              )
              .subscribe((data) => {
                this.usersinCardData = data.map((e) => {
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
              });
            this.subscription.push(sub4);
          });
        this.subscription.push(sub3);
      });
      this.subscription.push(sub2);
    });
    this.subscription.push(sub1);
  }

  sendRequest(id) {
    this.usrs.create_NewRequest(id, {
      id: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      avatarCover: this.avatarCover,
      jobTitle: this.jobTitle,
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
