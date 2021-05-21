import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomePostsService } from '../HomeServices/home-posts.service';

@Component({
  selector: 'app-edit-home-post',
  templateUrl: './edit-home-post.component.html',
  styleUrls: ['./edit-home-post.component.scss']
})
export class EditHomePostComponent implements OnInit {
  closeResult = '';
  editPostForm: FormGroup
  @Input() postID
  singlePost
  constructor(
    private model: NgbModal,
     private FB: FormBuilder,
     private postService:HomePostsService,
  ) { 
    this.editPostForm = this.FB.group({
      Body: ''
    })
  }

  ngOnInit(): void {
    this.postService. MyPostById(this.postID).subscribe(res => {
      this.singlePost = res.payload.data()
      if (this.singlePost != undefined) {
        this.editPostForm = this.FB.group({
          Body: this.singlePost.Body
        })
      }
    })

  }

  updatePost() {
    this.postService.editPost(this.postID, this.editPostForm.value.Body);
    this.editPostForm = this.FB.group({
      Body: ''
    })
  }

  open(content) {
    this.model.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
