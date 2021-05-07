import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BranchDatabaseService } from '../../Branches/Services/database.service';
import { TrackDatabaseService } from '../../Tracks/Services/database.service';
import { RegistrationService } from '../Service/registration.service';
import { SignInAuthError } from '../../login/signInInterface/sign-in-auth-error';
import { IUserBasics } from '../ViewModels/iuser-basics';
import { IUserDetails } from '../ViewModels/iuser-details';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatCurrency } from '@angular/common';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  registerNewUser: FormGroup;
  branches = [];
  tracks = [];
  durations = [];
  constructor(
    private registerAuth: RegistrationService,
    private branchDB: BranchDatabaseService,
    private trackDB: TrackDatabaseService,
    private FB: FormBuilder
  ) {
    this.branches = this.branchDB.getBranches();
    this.tracks = this.trackDB.getTracksData();
    this.durations = this.trackDB.getScholarshipDurations();
    this.registerNewUser = this.FB.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3,}$/),
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]\s{0,1}[a-zA-Z]{3,}$/),
        Validators.minLength(3),
      ]),
      nationalID: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{14}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{7,} $/),
        Validators.minLength(8),
      ]),
      branch: new FormControl(-1, [
        Validators.required,
        Validators.pattern(/[0-9]{1,2}/),
        Validators.min(1),
        Validators.max(100),
      ]),
      track: new FormControl(-1, [
        Validators.required,
        Validators.pattern(/[0-9]{1,2}/),
        Validators.min(1),
        Validators.max(100),
      ]),
      scholar: new FormControl(-1, [
        Validators.required,
        Validators.pattern(/[0-9]{1,2}/),
        Validators.min(1),
        Validators.max(100),
      ]),
    });
  }

  ngOnInit(): void {}
  register() {
    const invalid = [];
    const controls = this.registerNewUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);

    if (this.registerNewUser.valid) {
      let newUserBasic: IUserBasics = {
        email: this.registerNewUser.value.email,
        password: this.registerNewUser.value.password,
        isPeople: true,
        isAccepted: false,
        isRemoved: false,
        isReported: false,
        reports: [],
      };
      let newUserDetails: IUserDetails = {
        firstName: this.registerNewUser.value.firstName,
        lastName: this.registerNewUser.value.lastName,
        nationalID: this.registerNewUser.value.nationalID,
        branch: this.registerNewUser.value.branch,
        track: this.registerNewUser.value.track,
        scholarshipDuration: this.registerNewUser.value.scholar,
        jobTitle: '',
        about: '',
        experiences: [],
        friendList: [],
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/UsersProfileImages%2F2?alt=media&token=61809273-cae4-44bd-b88e-e665032829cc',
      };
      // console.log(
      //   this.registerAuth.registerNewUser(newUserBasic, newUserDetails)
      // );
    }
  }
}
