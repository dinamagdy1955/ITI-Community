import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';

@Component({
  selector: 'app-profile-body-about',
  templateUrl: './profile-body-about.component.html',
  styleUrls: ['./profile-body-about.component.scss'],
})
export class ProfileBodyAboutComponent implements OnInit {
  @Input() about: string;
  constructor(private modalService: NgbModal, private us: UserProfileService) {}

  ngOnInit() {}

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  saveChanges() {
    this.us.updateUserAbout(localStorage.getItem('uid'), this.about);
  }
}
