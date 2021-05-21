import { Component, OnInit } from '@angular/core';
import { HomePostsService } from '../HomeServices/home-posts.service';

@Component({
  selector: 'app-home-post-body',
  templateUrl: './home-post-body.component.html',
  styleUrls: ['./home-post-body.component.scss']
})
export class HomePostBodyComponent implements OnInit {
  MyPosts: any[] = [];
  frindsList: any[] = [];
  MyFriendsPosts: any[]=[];
  AllPosts:any[]=[]
  userID: string;
  constructor(
    private homePostServ:HomePostsService,
   
  ) {
    this.userID = localStorage.getItem('uid');
   }

  ngOnInit(): void {

    this.homePostServ.getAllMyPosts()
    .subscribe((data) => {
      this. AllPosts = data.map((e) => {
         return {
         id: e.payload.doc.id,
         data: e.payload.doc.data()
         };
     
      });
     // console.log(this.MyPosts);
    });

    this.homePostServ.getAllMyFriendsPosts ()
    .subscribe((data) => {
      this.MyFriendsPosts = data.map((e) => {
         return {
         id: e.payload.doc.id,
         data: e.payload.doc.data()
         };
     
      });
      console.log(this.MyFriendsPosts);
      this. AllPosts.push(...this.MyFriendsPosts)
      console.log(this.AllPosts);
      this.AllPosts = this.AllPosts.sort((a, b) => {
        const date1 = a.data.PostedDate;
        console.log(date1);
        const date2 = b.data.PostedDate;
        if (date1 > date2) {
          return -1;
        }
        if (date1 < date2) {
          return 1;
        }
        return 0;
      });

    });
  }

  

  deletePost(pid,post) {
    this.homePostServ.deletePost(pid,post)
  }




  }


