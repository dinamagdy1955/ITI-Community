import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-body-about',
  templateUrl: './profile-body-about.component.html',
  styleUrls: ['./profile-body-about.component.scss'],
})
export class ProfileBodyAboutComponent implements OnInit {
  @Input() userAbout;
  editAbout: FormGroup;
  userLocal = localStorage.getItem('uid');
  constructor(
    private modalService: NgbModal,
    private us: UserProfileService,
    private FB: FormBuilder
  ) {}

  ngOnInit() {
    this.editAbout = this.FB.group({
      about: this.userAbout.about,
    });
  }

  open(content) {
    this.editAbout = this.FB.group({
      about: this.userAbout.about,
    });
    this.modalService.open(content, { size: 'lg' });
  }
  saveChanges() {
    this.us.updateUserAbout(
      localStorage.getItem('uid'),
      this.editAbout.value.about
    );
  }
}
