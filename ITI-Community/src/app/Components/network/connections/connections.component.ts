import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { NetworkService } from '../Services/network.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent implements OnInit, OnDestroy {
  frindsList: any[] = [];
  keyWordsSearch;
  uid;
  data: Observable<any>;
  subscription: Subscription[] = [];
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
    let sub = this.usrs.getAllFriendsList(this.uid).subscribe((data) => {
      this.frindsList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          avatar: e.payload.doc.data()['avatar'],
          addedDate: e.payload.doc.data()['addedDate'],
        };
      });
    });
    this.subscription.push(sub);
  }

  sortRecently() {
    this.frindsList = this.frindsList.sort((a, b) => {
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
    this.frindsList = this.frindsList.sort((a, b) => {
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
    this.frindsList = this.frindsList.sort((a, b) => {
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

  DeleteFriend(id) {
    this.usrs.deleteFriend(id, this.uid);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
