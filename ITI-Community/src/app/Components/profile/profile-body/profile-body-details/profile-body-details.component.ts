import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(
    private modalService: NgbModal,
    private us: UserProfileService,
    private FB: FormBuilder
  ) {}

  ngOnInit() {
    this.editPersonalData = this.FB.group({
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      jobTitle: this.userDetails.jobTitle,
    });
  }

  openImage(contentImg) {
    this.previewedImg = undefined;
    this.modalService.open(contentImg, { size: 'lg' });
  }

  open(content) {
    this.editPersonalData = this.FB.group({
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      jobTitle: this.userDetails.jobTitle,
    });
    this.modalService.open(content, { size: 'lg' });
  }
  saveChanges() {
    this.us.updatePersonalData(
      localStorage.getItem('uid'),
      this.editPersonalData.value.firstName,
      this.editPersonalData.value.lastName,
      this.editPersonalData.value.jobTitle
    );
  }

  preview(files) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.previewedImg = reader.result;
    };
  }

  async upload() {
    const selectedImg = (<HTMLInputElement>document.getElementById('img'))
      .files;
    const img = await this.us.uploadImg(selectedImg[0]);
    await img.ref.getDownloadURL().subscribe(async (url) => {
      this.us.editUserAvatar(this.uidLocal, url);
      localStorage.setItem('avatar', url);
      this.userDetails.avatar = url;
    });
  }
}
