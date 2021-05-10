import { Component, OnInit } from '@angular/core';
import { NetworkUserService } from '../../Services/user.service';

@Component({
  selector: 'app-network-friend-request',
  templateUrl: './network-friend-request.component.html',
  styleUrls: ['./network-friend-request.component.scss']
})
export class NetworkFriendRequestComponent implements OnInit {
  Requests:any[]=[];
  constructor(
    private usrs:NetworkUserService,
  ) { }

  ngOnInit(): void {

    this.usrs.getAllFriendRequests().subscribe(data => {

      this.Requests  = data.map(e => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          reqState: e.payload.doc.data()['reqState'],
          avatar: e.payload.doc.data()['avatar'],
        };
      });
      console.log(this.Requests );
    
      
      
    });

   

  }

 
  IgnoreRequest(id){
this.usrs.ignore(id)

  }
      
  AcceptRequest(item)  {
    this.usrs.AcceptRequest(item)
  }

}
