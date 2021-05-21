import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MainServices/User.service';
import { BranchDatabaseService } from '../../Branches/Services/database.service';
import { NetworkService } from '../../network/Services/network.service';
import { TrackDatabaseService } from '../../Tracks/Services/database.service';
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
    avatar: '',
    branch: '',
    track: '',
    avatarCover: '',
    request: [],
  };
  UserExperiences = {
    id: '',
    experiences: [],
  };
  @Input() uid;
  uidLocal = localStorage.getItem('uid');
  constructor(
    private userService: UserService,
    private router: Router,
    private br: BranchDatabaseService,
    private tr: TrackDatabaseService,
    private network: NetworkService
  ) {}
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
                  avatar: userDetails.payload.get('avatar'),
                  avatarCover: userDetails.payload.get('avatarCover'),
                };
                this.UserAbout.id = this.uid;
                this.UserAbout.about = this.userData.about;
                this.UserDetails.id = this.uid;
                this.UserDetails.firstName = this.userData.firstName;
                this.UserDetails.lastName = this.userData.lastName;
                this.UserDetails.avatar = this.userData.avatar;
                this.UserDetails.jobTitle = this.userData.jobTitle;
                this.UserDetails.avatarCover = this.userData.avatarCover;
                this.br
                  .getBrancheById(this.userData.branch)
                  .subscribe((res) => {
                    this.UserDetails.branch = res.data()['name'];
                  });

                this.tr.getTrackById(this.userData.track).subscribe((res) => {
                  this.UserDetails.track = res.data()['name'];
                });
                this.network.getAllFriendsList(this.uid).subscribe((data) => {
                  this.UserDetails.request = data.map((e) => {
                    let id = e.payload.doc.id;
                    return id;
                  });
                });
                this.UserExperiences.id = this.uid;

                this.UserExperiences.experiences = this.userData.experiences;
              });
          }
        });
    }
  }
}
