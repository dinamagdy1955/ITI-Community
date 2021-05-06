import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-home-add-to-your-feed',
  templateUrl: './home-add-to-your-feed.component.html',
  styleUrls: ['./home-add-to-your-feed.component.scss']
})
export class HomeAddToYourFeedComponent implements OnInit {
  usersData :any[]=[]
  constructor(
    private usrs:UserService
  ) { }

  ngOnInit(): void {
  
    let friendData:any[];
    let  Requests:any[];

  let uid=localStorage.getItem("uid");
  this.usrs.getAllFriendRequests().subscribe(data => {
    Requests= data.map(e => {
     // if(e.payload.doc.id)
    let id= e.payload.doc.id
      return id
      
     
    });
    console.log(Requests);
  
    this.usrs.getAllFriendsList().subscribe(data => {
     friendData= data.map(e => {
      // if(e.payload.doc.id)
     let id= e.payload.doc.id
       return id
       
      
     });
     console.log(friendData);

   this.usrs.notINCard(Requests.concat(friendData)).subscribe(data =>{
    this.usersData= data.map(e => {
     
       return {
        id:e.payload.doc.id,
        firstName: e.payload.doc.data()['firstName']+' '+e.payload.doc.data()['lastName'],
        jobTitle: e.payload.doc.data()['jobTitle'],
        avatar: e.payload.doc.data()['avatar'],
        
       }
       
     });
     console.log(friendData);
   })
     
   });
    
  });
  

  
  }

}
