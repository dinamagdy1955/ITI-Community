import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/Components/network/Services/network.service';

@Component({
  selector: 'app-profile-side-viewed',
  templateUrl: './profile-side-viewed.component.html',
  styleUrls: ['./profile-side-viewed.component.scss'],
})
export class ProfileSideViewedComponent implements OnInit {
  uid = localStorage.getItem('uid');
  @Input() friendList;
  constructor(private network: NetworkService) {}

  ngOnInit() {}
}
