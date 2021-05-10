import { Component, OnInit } from '@angular/core';
import { UserService } from '../../network/Services/user.service';

@Component({
  selector: 'app-home-profile-card',
  templateUrl: './home-profile-card.component.html',
  styleUrls: ['./home-profile-card.component.scss']
})
export class HomeProfileCardComponent implements OnInit {
myData:any
frindsList:any[]=[]
  constructor(
    private usrs:UserService
  ) { }

  ngOnInit(): void {
   this.myData= this.usrs.data
   //console.log(this.myData.avatar)
   this.usrs.getAllFriendsList().subscribe(data => {

    this.frindsList = data.map(e => {
      return {
        id: e.payload.doc.id,
        firstName: e.payload.doc.data()['firstName'],
        lastName:e.payload.doc.data()['lastName'],
        jobTitle: e.payload.doc.data()['jobTitle'],
        avatar:e.payload.doc.data()['avatar'],
      };
    
    });
    
   // console.log(this.frindsList);
         
  
    
    
  });
  }

}
