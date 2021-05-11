import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../Services/network.service';

@Component({
  selector: 'app-manag-my-network-card',
  templateUrl: './manag-my-network-card.component.html',
  styleUrls: ['./manag-my-network-card.component.scss'],
})
export class ManagMyNetworkCardComponent implements OnInit {
  frindsList: any[] = [];
  constructor(private usrs: NetworkService) {}

  ngOnInit(): void {
    this.usrs
      .getAllFriendsList(localStorage.getItem('uid'))
      .subscribe((data) => {
        this.frindsList = data.map((e) => {
          return e.payload.doc.id;
        });
      });
  }
}
