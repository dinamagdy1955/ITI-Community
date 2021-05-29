import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupPostsService } from '../Services/group-posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  closeResult = '';
  editPostForm: FormGroup
  @Input() postID
  singlePost
  Lang: string
  constructor(private model: NgbModal,
    private FB: FormBuilder,
    private postService: GroupPostsService) {
    this.editPostForm = this.FB.group({
      Body: ''
    })
  }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang');
    this.postService.PostById(this.postID).subscribe(res => {
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
