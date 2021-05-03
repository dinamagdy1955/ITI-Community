import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BranchDatabaseService } from '../../Branches/Services/database.service';
import { TrackDatabaseService } from '../../Tracks/Services/database.service';
import { RegistrationService } from '../Service/registration.service';
import { SignInAuthError } from '../../login/signInInterface/sign-in-auth-error';
import { IUserBasics } from '../ViewModels/iuser-basics';
import { IUserDetails } from '../ViewModels/iuser-details';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  firstNameRegister: string = '';
  lastNameRegister: string = '';
  nationalIDRegister: string = '';
  emailRegister: string = '';
  passwordRegister: string = '';
  branchRegister: number = -1;
  trackRegister: number = -1;
  scholarRegister: number = -1;
  branches = [];
  tracks = [];
  durations = [];
  constructor(
    private registerAuth: RegistrationService,
    private branchDB: BranchDatabaseService,
    private trackDB: TrackDatabaseService
  ) {
    this.branches = this.branchDB.getBranches();
    this.tracks = this.trackDB.getTracksData();
    this.durations = this.trackDB.getScholarshipDurations();
  }

  ngOnInit(): void {}
  register() {
    console.log(this.trackRegister);
    console.log(this.branchRegister);
    let newUserBasic: IUserBasics = {
      email: this.emailRegister,
      password: this.passwordRegister,
      isPeople: true,
      isAccepted: false,
      isRemoved: false,
      isReported: false,
      reports: [],
    };
    let newUserDetails: IUserDetails = {
      firstName: this.firstNameRegister,
      lastName: this.lastNameRegister,
      nationalID: this.nationalIDRegister,
      branch: this.branchRegister,
      track: this.trackRegister,
      scholarshipDuration: this.scholarRegister,
      jobTitle: '',
      about: '',
      experiences: [],
      friendList: [],
    };
    console.log(
      this.registerAuth.registerNewUser(newUserBasic, newUserDetails)
    );
  }
}
