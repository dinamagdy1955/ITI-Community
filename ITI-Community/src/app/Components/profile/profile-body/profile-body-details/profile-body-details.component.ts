import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';
import { NetworkService } from '../../../network/Services/network.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
import { ChatsService } from 'src/app/Components/messages/Service/chats.service';
@Component({
  selector: 'app-profile-body-details',
  templateUrl: './profile-body-details.component.html',
  styleUrls: ['./profile-body-details.component.scss'],
})
export class ProfileBodyDetailsComponent implements OnInit, OnDestroy {
  @Input() userDetails;
  editPersonalData: FormGroup;
  uidLocal;
  userDataLocal;
  data: Observable<any>;
  subscription: Subscription[] = [];
  previewedImg = undefined;
  previewedCoverImg = undefined;
  branch;
  track = '';
  constructor(
    private modalService: NgbModal,
    private usr: UserProfileService,
    private FB: FormBuilder,
    private us: UserService,
    private NUS: NetworkService,
    private chat: ChatsService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uidLocal = res.id;
        this.userDataLocal = res;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit() {
    this.editPersonalData = this.FB.group({
      firstName: new FormControl(this.userDetails.firstName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3,}[a-zA-Z_ ]*$/),
      ]),
      lastName: new FormControl(this.userDetails.lastName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3,}[a-zA-Z_ ]*$/),
      ]),
      jobTitle: new FormControl(this.userDetails.jobTitle, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3,}[a-zA-Z_ ]*$/),
      ]),
    });
  }
  openCoverImage(contentCoverImg) {
    this.previewedCoverImg = undefined;
    this.modalService.open(contentCoverImg, { size: 'lg' });
  }

  openImage(contentImg) {
    this.previewedImg = undefined;
    this.modalService.open(contentImg, { size: 'lg' });
  }
  openPersonalData(content) {
    this.editPersonalData = this.FB.group({
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      jobTitle: this.userDetails.jobTitle,
    });
    this.modalService.open(content, { size: 'lg' });
  }
  saveChanges() {
    if (this.editPersonalData.valid) {
      this.modalService.dismissAll();
      this.usr.updatePersonalData(
        this.uidLocal,
        this.editPersonalData.value.firstName,
        this.editPersonalData.value.lastName,
        this.editPersonalData.value.jobTitle
      );
    }
  }
  preview(files, type) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      if (type == 'avatar') this.previewedImg = reader.result;
      else if (type == 'avatarCover') this.previewedCoverImg = reader.result;
    };
  }
  async upload(type) {
    const selectedImg = (<HTMLInputElement>document.getElementById('img'))
      .files;
    const img = await this.usr.uploadImg(selectedImg[0]);
    await img.ref.getDownloadURL().subscribe(async (url) => {
      if (type == 'avatar') {
        this.usr.editUserAvatar(this.uidLocal, url);
        this.userDetails.avatar = url;
      } else if (type == 'avatarCover') {
        this.usr.editUserCoverAvatar(this.uidLocal, url);
        this.userDetails.avatarCover = url;
      }
    });
  }
  addRequset(item) {
    this.NUS.create_NewRequest(
      {
        firstName: item.firstName,
        lastName: item.lastName,
        avatar: item.avatar,
        avatarCover: item.avatarCover,
        jobTitle: item.jobTitle,
        id: item.id,
        reqState: false,
      },
      this.userDataLocal
    );
  }

  DeleteFriendRequest(req) {
    this.NUS.deleteSentFriendReq(req, this.uidLocal);
  }

  DeleteFriend(id) {
    this.NUS.deleteFriend(id, this.uidLocal);
  }

  cancelRequest(req) {
    this.NUS.deleteSentFriendReq(req, this.uidLocal);
  }

  IgnoreRequest(id) {
    this.NUS.ignore(id, this.uidLocal);
  }

  AcceptRequest(item) {
    this.NUS.AcceptRequest(item, this.uidLocal, this.userDataLocal);
  }

  openChat(logged, reci) {
    this.chat.newChat(logged, reci);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
