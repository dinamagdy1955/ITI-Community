import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupPostsService } from '../Services/group-posts.service';

@Component({
  selector: 'app-write-box-model',
  templateUrl: './write-box-model.component.html',
  styleUrls: ['./write-box-model.component.scss']
})
export class WriteBoxModelComponent implements OnInit {
  closeResult = '';
  @Input() SelectedGroupId: string;
  getId: string;
  postForm: FormGroup
  constructor(private model: NgbModal, private grpService: GroupPostsService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      GroupId: '',
      Likes: 0,
      Post: '',
      PostedDate: new Date,
      UserId: '',
      postImg: ['']
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

  ngOnInit(): void {
    this.postForm = this.fb.group({
      GroupId: this.SelectedGroupId,
      Likes: 0,
      Post: '',
      PostedDate: new Date,
      UserId: '6646546sdsdsd',
      postImg: ['']
    })
  }

  onSubmit() {
    this.grpService.writePost(this.postForm.value);
    this.postForm = this.fb.group({
      GroupId: this.SelectedGroupId,
      Likes: 0,
      Post: '',
      PostedDate: new Date,
      UserId: '6646546sdsdsd',
      postImg: ['']
    })
  }

}