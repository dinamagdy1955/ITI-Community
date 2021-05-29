import { Component, Input, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomePostsService } from '../HomeServices/home-posts.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home-post-model',
  templateUrl: './home-post-model.component.html',
  styleUrls: ['./home-post-model.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomePostModelComponent implements OnInit {
  selectedLang: string;
  closeResult = '';
  @Input() SelectedGroupId: string;
  getId: string;
  postForm: FormGroup;
  userID: string;
  //GroupId
  uid;
  firstName;
  lastName;
  jobTitle;
  avatar;
  avatarCover;
  data: Observable<any>;
  subscription: Subscription[] = [];
  fileToUpload: File = null;

  constructor(
    public translateService: TranslateService,
    private model: NgbModal,
    private homePostServ: HomePostsService,
    private fb: FormBuilder,
    private us: UserService
  ) {
    
    translateService.addLangs(['en', 'ar']);
    if (
      localStorage.getItem('lang') == undefined ||
      localStorage.getItem('lang') == 'en'
    ) {
      translateService.use('en');
      localStorage.setItem('lang', 'en');
      this.selectedLang='en'
      // document.dir = 'ltr';
    } else if (localStorage.getItem('lang') == 'ar') {
      translateService.use('ar');
      localStorage.setItem('lang', 'ar');
      this.selectedLang='ar'
      // document.dir = 'rtl';
    }
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.jobTitle = res.jobTitle;
        this.avatar = res.avatar;
        this.avatarCover = res.avatarCover;
      }
    });
    this.subscription.push(sub);

    this.postForm = this.fb.group({
      //GroupId: '',
      postID: '',
      Likes: [[]],
      Body: '',
      savedState: false,
      PostedDate: new Date(),
      Auther: {
        id: this.uid,
        firstName: this.firstName,
        lastName: this.lastName,
        avatar: this.avatar,
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
    this.postForm = this.fb.group({
      // GroupId: this.SelectedGroupId,
      postID: '',
      Likes: [[]],
      Body: '',
      savedState: false,
      PostedDate: new Date(),
      Auther: {
        id: this.uid,
        firstName: this.firstName,
        lastName: this.lastName,
        avatar: this.avatar,
        jobTitle: this.jobTitle,
      },
      postImg: [[]],
    });
  }

  async onSubmit() {
    
    const selectedImg = (<HTMLInputElement>document.getElementById('Img'))
      .files;
    if (selectedImg.length > 0) {
      const img = await this.homePostServ.uploadImg(selectedImg);
      let Allimgs = [];
      let body = this.postForm.value.Body;
      for (let i = 0; i < img.ref.length; i++) {
        await img.ref[i].getDownloadURL().subscribe(async (url) => {
          Allimgs.push(url);
          if (i == img.ref.length - 1) {
            this.postForm.value.postImg = Allimgs;
            this.postForm.value.Body = body;
            this.homePostServ.writePost(this.postForm.value, this.uid);
          }
        });
      }
    } else {
      let body = this.postForm.value.Body;
      this.postForm.value.Body = body;
      this.homePostServ.writePost(this.postForm.value, this.uid);
    }
    
    this.postForm = this.fb.group({
      // GroupId: this.SelectedGroupId,
      postID: '',
      Likes: [[]],
      Body: '',
      savedState: false,
      PostedDate: new Date(),
      Auther: {
        id: this.uid,
        firstName: this.firstName,
        lastName: this.lastName,
        avatar: this.avatar,
        jobTitle: this.jobTitle,
      },
      postImg: [[]],
    });
  }
  
}
