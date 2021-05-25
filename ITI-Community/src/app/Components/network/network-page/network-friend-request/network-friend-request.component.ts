import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { NetworkService } from '../../Services/network.service';

@Component({
  selector: 'app-network-friend-request',
  templateUrl: './network-friend-request.component.html',
  styleUrls: ['./network-friend-request.component.scss'],
})
export class NetworkFriendRequestComponent implements OnInit, OnDestroy {
  Requests: any[] = [];
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  firstName;
  lastName;
  jobTitle;
  avatar;
  avatarCover;
  constructor(private usrs: NetworkService, private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
        this.firstName = res.id;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
        this.avatarCover = res.avatarCover;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    let sub = this.usrs.getAllFriendRequests(this.uid).subscribe((data) => {
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
    });
    this.subscription.push(sub);
  }

  IgnoreRequest(id) {
    this.usrs.ignore(id, this.uid);
  }

  AcceptRequest(item) {
    this.usrs.AcceptRequest(item, this.uid, {
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
