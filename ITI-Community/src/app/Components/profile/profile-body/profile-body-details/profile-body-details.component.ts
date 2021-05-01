import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-body-details',
  templateUrl: './profile-body-details.component.html',
  styleUrls: ['./profile-body-details.component.scss'],
})
export class ProfileBodyDetailsComponent implements OnInit {
  @Input() userDetails;
  editPersonalData: FormGroup;
  imgUrl: string | ArrayBuffer = '../../../../../assets/nav-img.png';
  constructor(
    private modalService: NgbModal,
    private us: UserProfileService,
    private FB: FormBuilder,
    private fire: AngularFirestore
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

  processFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.imgUrl = event.target.result;
      };
    }
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
}
