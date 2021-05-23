import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { NetworkService } from '../Services/network.service';

@Component({
  selector: 'app-all-sent-requestes-page',
  templateUrl: './all-sent-requestes-page.component.html',
  styleUrls: ['./all-sent-requestes-page.component.scss'],
})
export class AllSentRequestesPageComponent implements OnInit, OnDestroy {
  sentRequests: any[] = [];
  RequestsinCardData: any[];
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  constructor(private usrs: NetworkService, private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != undefined) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.usrs.getMySentfriendRequests(this.uid).subscribe((data) => {
      this.sentRequests = data.map((e) => {
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
  DeleteFriendRequest(req) {
    this.usrs.deleteSentFriendReq(req, this.uid);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
