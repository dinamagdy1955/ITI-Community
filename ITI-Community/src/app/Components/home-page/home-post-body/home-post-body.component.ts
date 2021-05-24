import { Component, OnInit } from '@angular/core';
import { HomePostsService } from '../HomeServices/home-posts.service';

@Component({
  selector: 'app-home-post-body',
  templateUrl: './home-post-body.component.html',
  styleUrls: ['./home-post-body.component.scss'],
})
export class HomePostBodyComponent implements OnInit {
  MyPosts: any[] = [];
  frindsList: any[] = [];
  MyFriendsPosts: any[] = [];
  AllPosts: any[] = [];
  userID: string;
  avatar:string;
  flag = false;
  constructor(private homePostServ: HomePostsService) {
    this.userID = localStorage.getItem('uid');
    this.avatar = localStorage.getItem('avatar');

  }

  
  identify(index, post) {
    return post.id;
  }
  ngOnInit(): void {
    this.homePostServ.getAllMyPosts().subscribe((data) => {
      this.AllPosts = data.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });

    });
   }
  
  deletePost(pid, post) {
    this.homePostServ.deletePost(pid, post)
  }
  spamPost(pid,post){
    this.homePostServ.SpamPost(pid, post)
  }
  SavePost(pid,post){
    this.homePostServ.SavePosts(pid, post)
  }

  Like(uid, pid,autID) {
    this.homePostServ.giveLike(uid, pid,autID);
  }
}
