import { Component, OnInit } from '@angular/core';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.scss']
})
export class SavedPostsComponent implements OnInit {
  savedPosts: any[] = [];
  uid;
  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(
    private postsServ:HomePostsService,private us: UserService
  ) { 
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != undefined) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.postsServ.getSavedPosts(this.uid).subscribe((data) => {
      console.log(data)
      this.savedPosts = data.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
      console.log(this.savedPosts)
    });
  }
  unsave(item){
    this.postsServ.unSavePost(item,this.uid)
  }
}
//getSavedPosts