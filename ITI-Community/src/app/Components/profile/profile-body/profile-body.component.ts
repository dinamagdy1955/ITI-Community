import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MainServices/User.service';
import { IUserProfileData } from './ViewModels/iuser-profile-data';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.scss'],
})
export class ProfileBodyComponent implements OnInit, OnChanges {
  userData: IUserProfileData;
  UserAbout = {
    id: '',
    about: '',
  };
  UserDetails = {
    id: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
  };
  UserExperiences = {
    id: '',
    experiences: [],
  };
  @Input() uid;

  uidLocal = localStorage.getItem('uid');
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.uid != undefined) {
      let sub1 = this.userService
        .getUserBasic(this.uid)
        .subscribe((userBasic) => {
          if (userBasic.payload.data() == undefined) {
            this.router.navigate(['/notFound']);
          } else {
            let sub2 = this.userService
              .getUserData(this.uid)
              .subscribe((userDetails) => {
                this.userData = {
                  isPeople: userBasic.payload.get('isPeople'),
                  isAccepted: userBasic.payload.get('isAccepted'),
                  isRemoved: userBasic.payload.get('isRemoved'),
                  isReported: userBasic.payload.get('isReported'),
                  reports: userBasic.payload.get('reports'),
                  firstName: userDetails.payload.get('firstName'),
                  lastName: userDetails.payload.get('lastName'),
                  jobTitle: userDetails.payload.get('jobTitle'),
                  about: userDetails.payload.get('about'),
                  branch: userDetails.payload.get('branch'),
                  track: userDetails.payload.get('track'),
                  experiences: userDetails.payload.get('experiences'),
                  friendList: userDetails.payload.get('friendList'),
                };
                this.UserAbout.id = this.uid;
                this.UserAbout.about = this.userData.about;
                this.UserDetails.id = this.uid;
                this.UserDetails.firstName = this.userData.firstName;
                this.UserDetails.lastName = this.userData.lastName;
                this.UserDetails.jobTitle = this.userData.jobTitle;
                this.UserExperiences.id = this.uid;
                this.UserExperiences.experiences = this.userData.experiences;
              });
          }
        });
    }
  }
}
