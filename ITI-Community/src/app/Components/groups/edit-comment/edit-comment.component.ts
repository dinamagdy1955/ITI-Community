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
  singleComment
  constructor(private model: NgbModal, private FB: FormBuilder, private commentService: PostCommentService) {
    this.editCommentForm = this.FB.group({
      comment: ''
    })
  }

  ngOnInit(): void {
    let sub = this.commentService.getCommentById(this.commentID).subscribe(res => {
      this.singleComment = res
      this.editCommentForm = this.FB.group({
        comment: this.singleComment.comment
      })
      sub.unsubscribe();
    })
  }



  updateComment() {
    this.commentService.editComment(this.commentID, this.editCommentForm.value.comment);
    this.editCommentForm = this.FB.group({
      comment: ''
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
