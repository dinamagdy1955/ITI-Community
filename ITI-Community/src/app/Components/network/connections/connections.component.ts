import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  frindsList:any[]=[]
  constructor(
    private usrs:UserService
  ) { }

  ngOnInit(): void {


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
      
      console.log(this.frindsList);
           
    
      
      
    });


  }
  DeleteFriend(id){
    this.usrs.deleteFriend(id)
  }


}
