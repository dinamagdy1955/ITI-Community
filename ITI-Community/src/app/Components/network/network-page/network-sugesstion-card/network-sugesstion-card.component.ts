import { Component, OnInit } from '@angular/core';
//import { userInfo } from 'node:os';
import { IUserDetails } from 'src/app/Components/registration/ViewModels/iuser-details';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-network-sugesstion-card',
  templateUrl: './network-sugesstion-card.component.html',
  styleUrls: ['./network-sugesstion-card.component.scss']
})
export class NetworkSugesstionCardComponent implements OnInit {
  usersData:any[]
  friendRequest:any[]
  firstName:'marwa';
    lastName:'taag';
    id:'';
  constructor(
    private usrs:UserService,
  ) { }

  ngOnInit(): void {

    this.usrs.getAllUserData().subscribe(data => {

      this.usersData = data.map(e => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName']+' '+e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
        };
      });
      console.log(this.usersData);
    
      
      
    });


    ////////////////////////////////
   

    

  }
  
  // sendRequest() {
    // this.usrs.getAllFriendRequests().subscribe(data => {

    //   this.friendRequest = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       firstName: e.payload.doc.data()['firstName'],
    //      // lastName: e.payload.doc.data()['lastName'],
    //      // jobTitle: e.payload.doc.data()['jobTitle'],
    //     };
    //   });
    //   console.log(this.friendRequest);
    
    // });
// console.log("marwa")

//  }
sendRequest(id,fn) {
  // console.log(id);
   console.log(id);
  let Request = {};
  // Request['firstName'] = this.firstName;
  // Request['lastName'] = this.lastName;
// Request['id'] = this.id;
  this.usrs.create_NewRequest(id,fn);
  // .then(resp => {
  //   this.firstName = "marwa";
  //  this.lastName = "taag";
  //   this.id =id;
  //   console.log(resp);
  //   console.log("request done");
  // })
  //   .catch(error => {
  //     console.log(error);
  //   });
}











}