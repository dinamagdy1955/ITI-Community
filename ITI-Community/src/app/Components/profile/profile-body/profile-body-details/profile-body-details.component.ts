import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';

@Component({
  selector: 'app-profile-body-details',
  templateUrl: './profile-body-details.component.html',
  styleUrls: ['./profile-body-details.component.scss'],
})
export class ProfileBodyDetailsComponent implements OnInit {
  @Input() userDetails;
  constructor(private modalService: NgbModal, private us: UserProfileService) {}

  ngOnInit() {}

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  saveChanges() {
    this.us.updatePersonalData(
      localStorage.getItem('uid'),
      this.userDetails.firstName,
      this.userDetails.lastName,
      this.userDetails.jobTitle
    );
  }
}
