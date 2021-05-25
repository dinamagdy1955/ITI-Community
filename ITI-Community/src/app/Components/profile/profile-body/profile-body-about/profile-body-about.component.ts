import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../Service/user-profile.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-profile-body-about',
  templateUrl: './profile-body-about.component.html',
  styleUrls: ['./profile-body-about.component.scss'],
})
export class ProfileBodyAboutComponent implements OnInit, OnDestroy {
  @Input() userAbout;
  editAbout: FormGroup;
  data: Observable<any>;
  subscription: Subscription[] = [];
  userLocal;
  constructor(
    private modalService: NgbModal,
    private usr: UserProfileService,
    private FB: FormBuilder,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userLocal = res.id;
      }
    });
    this.subscription.push(sub);
  }
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
      this.usr.updateUserAbout(this.userLocal, this.editAbout.value.about);
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
