import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
      about: new FormControl(this.userAbout.about),
    });
  }
  openAbout(content) {
    this.editAbout = this.FB.group({
      about: this.userAbout.about,
    });
    this.modalService.open(content, { size: 'lg' });
  }
  saveChanges() {
    if (this.editAbout.valid) {
      this.modalService.dismissAll('Save click');
      this.us.updateUserAbout(
        localStorage.getItem('uid'),
        this.editAbout.value.about
      );
    }
  }
}
