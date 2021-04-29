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
  constructor(private model: NgbModal, private FB: FormBuilder, private postService: GroupPostsService) {
    this.editPostForm = this.FB.group({
      Post: ''
    })
  }

  ngOnInit(): void {
    let sub = this.postService.getPostById(this.postID).subscribe((res) => {
      this.singlePost = res
      this.editPostForm = this.FB.group({
        Post: this.singlePost.Post
      })
      sub.unsubscribe();
    })
  }

  updatePost() {
    this.postService.editPost(this.postID, this.editPostForm.value.Post);
    this.editPostForm = this.FB.group({
      Post: ''
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
