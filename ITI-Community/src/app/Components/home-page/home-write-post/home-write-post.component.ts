import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../network/Services/network.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
@Component({
  selector: 'app-home-write-post',
  templateUrl: './home-write-post.component.html',
  styleUrls: ['./home-write-post.component.scss'],
})
export class HomeWritePostComponent implements OnInit {
  myData: any;
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
      if (res != null) {
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
    this.myData = {
      id: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      jobTitle: this.jobTitle,
      avatarCover: this.avatarCover,
    };
  }
}
