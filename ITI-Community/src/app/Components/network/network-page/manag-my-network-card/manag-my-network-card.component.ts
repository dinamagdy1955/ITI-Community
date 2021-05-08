import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-manag-my-network-card',
  templateUrl: './manag-my-network-card.component.html',
  styleUrls: ['./manag-my-network-card.component.scss']
})
export class ManagMyNetworkCardComponent implements OnInit {
  frindsList:any[]=[];
  constructor(
private usrs:UserService

  ) { }

  ngOnInit(): void {
    this.usrs.getAllFriendsList().subscribe(data => {
     this.frindsList= data.map(e =>
       {
         let id= e.payload.doc.id
        return id
        
       
      }
      );
    })

}
}