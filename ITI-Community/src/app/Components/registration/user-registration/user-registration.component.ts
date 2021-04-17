import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BranchDatabaseService } from '../../Branches/database.service';
import { TrackDatabaseService } from '../../Tracks/database.service';
import { RegistrationService } from '../Service/registration.service';
import { SignInAuthError } from '../../login/signInInterface/sign-in-auth-error';
import { IUserBasics } from '../ViewModels/iuser-basics';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  nationalIDRegister: string = '';
  emailRegister: string = '';
  passwordRegister: string = '';
  branchRegister:number = -1;
  trackRegister:number = -1;
  scholarRegister:number = -1;
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
    let newUser:IUserBasics={
      email: this.emailRegister,
      password: this.passwordRegister,
      nationalID: this.nationalIDRegister,
      branch: this.branchRegister,
      track:this.trackRegister,
      scholarshipDuration:this.scholarRegister
    }
    console.log(newUser);
    console.log(this.registerAuth.registerNewUser(newUser));
     
  }
}
