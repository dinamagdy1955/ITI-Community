import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-network-friend-request',
  templateUrl: './network-friend-request.component.html',
  styleUrls: ['./network-friend-request.component.scss']
})
export class NetworkFriendRequestComponent implements OnInit {
  Requests:any[]
  constructor(
    private usrs:UserService,
  ) { }

  ngOnInit(): void {

    this.usrs.getAllFriendRequests()
    // .subscribe(data => {

    //   this.Requests = data.map(e => {
    //     const state =e.payload.doc.data()["friendRequest"];
    //     if(state){

    //     return {
    //       id: e.payload.doc.id,
    //       firstName: e.payload.doc.data()['firstName'],
    //       reqState: e.payload.doc.data()['reqState'],
         
    //     } };
    //   });
    //   console.log(this.Requests);
      
    
      
      
    // });
  }



}
