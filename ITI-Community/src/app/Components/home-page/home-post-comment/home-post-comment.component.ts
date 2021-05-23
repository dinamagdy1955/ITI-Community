import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HPostCommentService } from '../HomeServices/hpost-comment.service';

@Component({
  selector: 'app-home-post-comment',
  templateUrl: './home-post-comment.component.html',
  styleUrls: ['./home-post-comment.component.scss'],
})
export class HomePostCommentComponent implements OnInit {
  @Input() PostID: string;
  @Input() admins;
  @Input() AUTHId: string;
  subscriptions: Subscription[] = [];
  getComments = [];

  userID;

  turnOff: boolean = false;
  counter: number = 0;
  constructor(public commentService: HPostCommentService) {}
  identify(index, c) {
    return c.id;
  }
  ngOnInit(): void {
    this.userID = localStorage.getItem('uid');
 
    if (this.AUTHId == this.userID) {
      let sub = this.commentService
        .getPostComments2(this.PostID)
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
      this.subscriptions.push(sub);
    } else {
      let sub = this.commentService
        .getFriendPostComments(this.PostID)
        .subscribe((res) => {
          this.getComments = res.map((e) => {
            return {
              id: e.payload.doc.id,
              ...(e.payload.doc.data() as object),
              doc: e.payload.doc,
            };
          });
          console.log('friend posts', this.getComments);
          this.hideBtn(res);
        });
      this.subscriptions.push(sub);
    }
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
      if (this.AUTHId == this.userID) {
      this.counter += 5
      let param = this.getComments[this.getComments.length - 1].doc
      this.commentService.getPostComments2(this.PostID, param).subscribe(res => {
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
    else {

      
     
        this.counter += 5
        let param = this.getComments[this.getComments.length - 1].doc
        this.commentService.getFriendPostComments(this.PostID, param).subscribe(res => {
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
    
    }
  
    deleteComment(Cid, postId) {
      this.commentService.deleteComment(Cid, postId,this.AUTHId);
    }
       
  
  
  }
















 
