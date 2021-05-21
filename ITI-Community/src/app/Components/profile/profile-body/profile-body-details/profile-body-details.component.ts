import { Component, Input, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-profile-body-details',
  templateUrl: './profile-body-details.component.html',
  styleUrls: ['./profile-body-details.component.scss'],
})
export class ProfileBodyDetailsComponent implements OnInit {
  @Input() userDetails;
  editPersonalData: FormGroup;
  uidLocal = localStorage.getItem('uid');
  previewedImg = undefined;
  previewedCoverImg = undefined;
  branch;
  track = '';
  friendsRequest = [];
  constructor(
    private modalService: NgbModal,
    private us: UserProfileService,
    private FB: FormBuilder,
    private ur: UserService,
    private NUS: NetworkService
  ) {}
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
      this.us.updatePersonalData(
        localStorage.getItem('uid'),
        this.editPersonalData.value.firstName,
        this.editPersonalData.value.lastName,
        this.editPersonalData.value.jobTitle
      );
      this.ur.setlocalUserData({
        ...this.ur.localUserData,
        firstName: this.editPersonalData.value.firstName,
        lastName: this.editPersonalData.value.lastName,
        jobTitle: this.editPersonalData.value.jobTitle,
      });
      console.log(this.ur.localUserData);
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
    const img = await this.us.uploadImg(selectedImg[0]);
    await img.ref.getDownloadURL().subscribe(async (url) => {
      if (type == 'avatar') {
        this.us.editUserAvatar(this.uidLocal, url);
        localStorage.setItem('avatar', url);
        this.userDetails.avatar = url;
      } else if (type == 'avatarCover') {
        this.us.editUserCoverAvatar(this.uidLocal, url);
        localStorage.setItem('avatarCover', url);
        this.userDetails.avatarCover = url;
      }
    });
  }
  addRequset(item) {
    this.NUS.create_NewRequest(item, this.userDetails.id);
  }
}
