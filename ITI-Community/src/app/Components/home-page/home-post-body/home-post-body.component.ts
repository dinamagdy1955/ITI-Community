import { Component, OnInit } from '@angular/core';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
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
  flag = false;
  uid;
  avatar;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(private homePostServ: HomePostsService,private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != undefined) {
        this.uid = res.id;
        this.avatar = res.avatar;
      }
    });
    this.subscription.push(sub);
  }

  
  identify(index, post) {
    return post.id;
  }
  ngOnInit(): void {
    this.homePostServ.getAllMyPosts(this.uid).subscribe((data) => {
      this.AllPosts = data.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });

    });
   }
  
  deletePost(pid, post) {
    this.homePostServ.deletePost(pid, post,this.uid)
  }
  spamPost(pid,post){
    this.homePostServ.SpamPost(pid, post,this.uid)
  }
  SavePost(pid,post){
    this.homePostServ.SavePosts(pid, post,this.uid)
  }

  Like(uid, pid,autID) {
    this.homePostServ.giveLike(uid, pid,autID);
  }
}
