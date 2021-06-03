import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupPostsService } from '../Services/group-posts.service';
import { ToastServiceService } from '../toasterMsg/toastService.service';

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
  images = []
  constructor(private model: NgbModal,
    private FB: FormBuilder,
    private postService: GroupPostsService, private toastService: ToastServiceService) {
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
          Body: this.singlePost.Body,
          postImg: [[]]
        })
        this.images = this.singlePost.postImg
      }
    })
  }

  deleteImg(id) {
    this.showMsgImg()
    this.images.splice(id, 1)
  }

  async updatePost() {
    this.showMsg()

    const selectedImg = (<HTMLInputElement>document.getElementById('Img'))
      .files;
    if (selectedImg.length > 0) {
      const img = await this.postService.uploadImg(selectedImg);
      let body = this.editPostForm.value.Body;
      for (let i = 0; i < img.ref.length; i++) {
        await img.ref[i].getDownloadURL().subscribe(async (url) => {
          this.images.push(url);
          if (i == img.ref.length - 1) {
            this.editPostForm.value.postImg = this.images;
            this.editPostForm.value.Body = body;
            this.postService.editPost(this.postID, this.editPostForm.value.Body, this.images);
          }
        });
      }
    } else {
      let body = this.editPostForm.value.Body;
      this.editPostForm.value.Body = body;
      this.postService.editPost(this.postID, this.editPostForm.value.Body, this.images);
    }
    this.editPostForm = this.FB.group({
      Body: '',
      postImg: [[]]
    })
  }

  open(content) {
    this.model.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  showMsg() {
    if (this.Lang == 'en') {
      this.toastService.show('Edited Succeeded', { classname: 'bg-info text-light', delay: 5000 });
    } else {
      this.toastService.show('تم التعديل', { classname: 'bg-info text-right text-light', delay: 5000 });
    }
  }
  showMsgImg() {
    if (this.Lang == 'en') {
      this.toastService.show('Image Deleted', { classname: 'bg-danger text-light', delay: 5000 });
    } else {
      this.toastService.show('تم حذف الصورة', { classname: 'bg-danger text-right text-light', delay: 5000 });
    }
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
