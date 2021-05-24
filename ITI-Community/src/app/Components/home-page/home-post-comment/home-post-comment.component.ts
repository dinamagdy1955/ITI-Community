import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-home-post-comment',
  templateUrl: './home-post-comment.component.html',
  styleUrls: ['./home-post-comment.component.scss'],
})
export class HomePostCommentComponent implements OnInit {
  @Input() PostID: string;
  @Input() admins;
  @Input() AUTHId: string;
  subscription: Subscription[] = [];
  getComments = [];
  uid;
  turnOff: boolean = false;
  counter: number = 0;
  data: Observable<any>;
  constructor(public commentService: HPostCommentService,private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != undefined) {
        this. uid= res.id;
      }
    });
    this.subscription.push(sub);
  }
  identify(index, c) {
    return c.id;
  }
  ngOnInit(): void {

      let sub = this.commentService
        .getPostComments2(this.PostID,this.uid)
        .subscribe((res) => {
          this.getComments = res.map((e) => {
            return {
              id: e.payload.doc.id,
              ...(e.payload.doc.data() as object),
              doc: e.payload.doc,
            };
          });
         console.log('mu posts', this.getComments);
          this.hideBtn(res);
        });
      this.subscription.push(sub);

  }

  hideBtn(res) {
    if (
      (res.length % 5 != 0 && res.length - this.counter == 0) ||
      res.length % 5 != 0 ||
      res.length == 0
    ) {
      this.turnOff = true;
    } else {
      this.turnOff = false;
    }
  }

 
    loadMore() {
     
      this.counter += 5
      let param = this.getComments[this.getComments.length - 1].doc
      this.commentService.getPostComments2(this.PostID,this.uid, param).subscribe(res => {
        res.map(e => {
          this.getComments.push({
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as object),
            doc: e.payload.doc
          })
        })
        this.hideBtn(res)
      })
   
    
    }
  
    deleteComment(Cid, postId) {
      this.commentService.deleteComment(Cid, postId,this.AUTHId);
    }
       
  
  
  }
















 
