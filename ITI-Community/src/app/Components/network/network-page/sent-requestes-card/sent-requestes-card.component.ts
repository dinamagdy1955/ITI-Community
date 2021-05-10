import { Component, OnInit } from '@angular/core';
import { NetworkUserService } from '../../Services/user.service';

@Component({
  selector: 'app-sent-requestes-card',
  templateUrl: './sent-requestes-card.component.html',
  styleUrls: ['./sent-requestes-card.component.scss']
})
export class SentRequestesCardComponent implements OnInit {
 sentRequests:any[]=[];
 RequestsinCardData:any[]
  constructor(
    private usrs:NetworkUserService,
  ) { }

  ngOnInit(): void {

    this.usrs.getMySentfriendRequests().subscribe(data => {

      this.sentRequests  = data.map(e => {
        return {
          id: e.payload.doc.id,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          jobTitle: e.payload.doc.data()['jobTitle'],
          avatar: e.payload.doc.data()['avatar'],
        };
      });
      console.log(this.sentRequests );
    
      
      
    });

    
  

    

  }
}
