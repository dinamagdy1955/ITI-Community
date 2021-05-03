import { Component, Input, OnInit } from '@angular/core';
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
  imgUrl: string | ArrayBuffer = '../../../../../assets/nav-img.png';
  uidLocal = localStorage.getItem('uid');
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

  upload(event) {
    this.us.uploadImg(event.target.files[0]);
  }
}
