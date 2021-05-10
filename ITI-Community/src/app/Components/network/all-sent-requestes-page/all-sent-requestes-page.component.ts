import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-all-sent-requestes-page',
  templateUrl: './all-sent-requestes-page.component.html',
  styleUrls: ['./all-sent-requestes-page.component.scss']
})
export class AllSentRequestesPageComponent implements OnInit {
  sentRequests:any[]=[];
  RequestsinCardData:any[]
  constructor(
    private usrs:UserService,
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
  DeleteFriendRequest(req){
    this.usrs.deleteSentFriendReq(req)
  }
}
