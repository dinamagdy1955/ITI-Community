import { Component, OnInit } from '@angular/core';
//import { userInfo } from 'node:os';
import { IUserDetails } from 'src/app/Components/registration/ViewModels/iuser-details';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-network-sugesstion-card',
  templateUrl: './network-sugesstion-card.component.html',
  styleUrls: ['./network-sugesstion-card.component.scss']
})
export class NetworkSugesstionCardComponent implements OnInit {
  usersinCardData:any[]
  friendRequest:any[]
  firstName:'marwa';
    lastName:'taag';
    id:'';
  constructor(
    private usrs:UserService,
  ) { }

  ngOnInit(): void {


  
      let friendData:any[];
      let  Requests:any[];
      let SentfriendRequest:any[];
  
    let uid=localStorage.getItem("uid");
    this.usrs.getAllFriendRequests().subscribe(data => {
      Requests= data.map(e => {
      let id= e.payload.doc.id
        return id
      });

      console.log(Requests);
    
      this.usrs.getAllFriendsList().subscribe(data => {
        friendData= data.map(e => {
        let id= e.payload.doc.id
          return id
        });
        console.log(friendData);

        this.usrs.getMySentfriendRequests().subscribe(data => {
          SentfriendRequest= data.map(e => {
          let id= e.payload.doc.id
            return id
          });
          console.log(SentfriendRequest);


     this.usrs.notINCard(Requests.concat(friendData,SentfriendRequest)).subscribe(data =>{
      this.usersinCardData= data.map(e => {
       
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
   });
    
  
    







//////////////////////////////////////
   /* this.usrs.getAllUserData().subscribe(data => {

      this.usersData = data.map(e => {
       // if(e.payload.doc.id)
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName']+' '+e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
        };
      });
      console.log(this.usersData);
    
      
      
    });

*/
    ////////////////////////////////
   

    

  }

sendRequest(id) {
   console.log(id);
  this.usrs.create_NewRequest(id);

}











}