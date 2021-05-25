import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-home-post',
  templateUrl: './edit-home-post.component.html',
  styleUrls: ['./edit-home-post.component.scss'],
})
export class EditHomePostComponent implements OnInit {
  closeResult = '';
  editPostForm: FormGroup;
  @Input() postID;
  singlePost;
  uid;

  data: Observable<any>;
  subscription: Subscription[] = [];
  constructor(
    private model: NgbModal,
    private FB: FormBuilder,
    private postService: HomePostsService,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
    this.editPostForm = this.FB.group({
      Body: '',
    });
  }

  ngOnInit(): void {
    this.postService.MyPostById(this.postID, this.uid).subscribe((res) => {
      this.singlePost = res.payload.data();
      if (this.singlePost != undefined) {
        this.editPostForm = this.FB.group({
          Body: this.singlePost.Body,
        });
      }
    });
  }

  updatePost() {
    this.postService.editPost(
      this.postID,
      this.editPostForm.value.Body,
      this.uid
    );
    this.editPostForm = this.FB.group({
      Body: '',
    });
  }

  open(content) {
    this.model
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
