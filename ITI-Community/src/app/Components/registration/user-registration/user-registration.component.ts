import { Component, OnInit } from '@angular/core';
import { BranchDatabaseService } from '../../GeneralServices/Branches/database.service';
import { TrackDatabaseService } from '../../GeneralServices/Tracks/database.service';
import { RegistrationService } from '../registrationService/registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  nationalIDRegister: string = '';
  emailRegister: string = '';
  passwordRegister: string = '';
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
    this.registerAuth.registerNewUser(
      this.emailRegister,
      this.passwordRegister
    );
  }
}
