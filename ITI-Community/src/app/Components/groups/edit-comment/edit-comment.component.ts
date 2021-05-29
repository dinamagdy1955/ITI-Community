import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostCommentService } from '../Services/post-comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  closeResult = ''
  editCommentForm: FormGroup
  @Input() commentID
  @Input() postID
  singleComment
  Lang: string
  constructor(private model: NgbModal, private FB: FormBuilder, private commentService: PostCommentService) {
    this.editCommentForm = this.FB.group({
      Body: ''
    })
  }

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang')
    this.commentService.getCommentById(this.postID, this.commentID).subscribe(res => {
      this.singleComment = res
      if (this.singleComment != undefined) {
        this.editCommentForm = this.FB.group({
          Body: this.singleComment.Body
        })
      }
    })

  }



  updateComment() {
    this.commentService.editComment(this.postID, this.commentID, this.editCommentForm.value.Body);
    this.editCommentForm = this.FB.group({
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
