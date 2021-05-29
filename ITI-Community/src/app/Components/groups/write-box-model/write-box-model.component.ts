import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { GroupPostsService } from '../Services/group-posts.service';

@Component({
  selector: 'app-write-box-model',
  templateUrl: './write-box-model.component.html',
  styleUrls: ['./write-box-model.component.scss'],
})
export class WriteBoxModelComponent implements OnInit {
  closeResult = '';
  @Input() SelectedGroupId: string;
  getId: string;
  postForm: FormGroup;
  userID: string;
  firstName;
  lastName;
  avatar;
  jobTitle;
  data: Observable<any>;
  subscriptions: Subscription[] = [];
  Lang: string;
  constructor(
    private model: NgbModal,
    private grpService: GroupPostsService,
    private fb: FormBuilder,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
      }
    });
    this.subscriptions.push(sub);
    this.postForm = this.fb.group({
      GroupId: '',
      Likes: [[]],
      Body: '',
      PostedDate: new Date(),
      Auther: {
        avatar: this.avatar,
        firstName: this.firstName,
        lastName: this.lastName,
        id: this.userID,
        jobTitle: this.jobTitle,
      },
      postImg: [[]],
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

  ngOnInit(): void {
    this.Lang = localStorage.getItem('lang');

    this.postForm = this.fb.group({
      GroupId: this.SelectedGroupId,
      Likes: [[]],
      Body: '',
      PostedDate: new Date(),
      Auther: {
        avatar: this.avatar,
        firstName: this.firstName,
        lastName: this.lastName,
        id: this.userID,
        jobTitle: this.jobTitle,
      },
      postImg: [[]],
    });
  }

  async onSubmit() {
    const selectedImg = (<HTMLInputElement>document.getElementById('Img'))
      .files;
    if (selectedImg.length > 0) {
      const img = await this.grpService.uploadImg(selectedImg);
      let Allimgs = [];
      let body = this.postForm.value.Body;
      for (let i = 0; i < img.ref.length; i++) {
        await img.ref[i].getDownloadURL().subscribe(async (url) => {
          Allimgs.push(url);
          if (i == img.ref.length - 1) {
            this.postForm.value.postImg = Allimgs;
            this.postForm.value.Body = body;
            this.grpService.writePost(this.postForm.value);
          }
        });
      }
    } else {
      let body = this.postForm.value.Body;
      this.postForm.value.Body = body;
      this.grpService.writePost(this.postForm.value);
    }
    this.postForm = this.fb.group({
      GroupId: this.SelectedGroupId,
      Likes: [[]],
      Body: '',
      PostedDate: new Date(),
      Auther: {
        avatar: this.avatar,
        firstName: this.firstName,
        lastName: this.lastName,
        id: this.userID,
        jobTitle: this.jobTitle,
      },
      postImg: [[]],
    });
  }
}
