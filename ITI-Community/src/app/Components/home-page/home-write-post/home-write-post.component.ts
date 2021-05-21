import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../network/Services/network.service';
@Component({
  selector: 'app-home-write-post',
  templateUrl: './home-write-post.component.html',
  styleUrls: ['./home-write-post.component.scss'],
})
export class HomeWritePostComponent implements OnInit {
  myData: any;
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
  }
}
