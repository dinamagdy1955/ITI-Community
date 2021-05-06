import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  frindsList:any[]
  constructor(
    private usrs:UserService,
  ) { }

  ngOnInit(): void {


    this.usrs.getAllFriendsList().subscribe(data => {

      this.frindsList = data.map(e => {
        return {
          id: e.payload.doc.id,
          friendList:e.payload.doc.data()['friendList'],
          firstName: e.payload.doc.data()['firstName']+' '+e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
        };
      
      });
      
      console.log(this.frindsList);
           
    
      
      
    });


  }

}
