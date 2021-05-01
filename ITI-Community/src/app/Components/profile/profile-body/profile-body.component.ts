import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/MainServices/User.service';
import { IExperience } from './ViewModels/iexperience';
import { IUserProfileData } from './ViewModels/iuser-profile-data';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.scss'],
})
export class ProfileBodyComponent implements OnInit {
  userData: IUserProfileData;
  UserAbout: string = '';
  UserDetails = {
    firstName: '',
    lastName: '',
    jobTitle: '',
  };
  experiences: IExperience[];
  uid;
  constructor(
    private userService: UserService,
    private actvRout: ActivatedRoute,
    private router: Router
  ) {
    this.actvRout.paramMap.subscribe((params) => {
      this.uid = params.get('id');
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
                this.UserAbout = this.userData.about;
                this.UserDetails.firstName = this.userData.firstName;
                this.UserDetails.lastName = this.userData.lastName;
                this.UserDetails.jobTitle = this.userData.jobTitle;
                this.experiences = this.userData.experiences;
                console.log('in fetch');
              });
          }
        });
    });
  }

  ngOnInit() {}
}
