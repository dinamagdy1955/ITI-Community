import { Component, OnInit, ViewChild } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MainServices/User.service';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('err') myModal;
  regErr: SignInAuthError;
  registerNewUser: FormGroup;
  branches = [];
  tracks = [];
  durations = [];
  fieldTextType: boolean = false;
  constructor(
    private registerAuth: RegistrationService,
    private branchDB: BranchDatabaseService,
    private trackDB: TrackDatabaseService,
    private FB: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private us: UserService
  ) {
    this.branches = this.branchDB.getBranches();
    this.tracks = this.trackDB.getTracksData();
    this.durations = this.trackDB.getScholarshipDurations();
    this.registerNewUser = this.FB.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3,}[a-zA-Z_ ]*$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3,}[a-zA-Z_ ]*$/),
        Validators.minLength(3),
      ]),
      nationalID: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{14}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,38}$/),
      ]),
      branch: new FormControl(-1, [Validators.required, Validators.min(0)]),
      track: new FormControl(-1, [Validators.required, Validators.min(0)]),
      scholar: new FormControl(-1, [Validators.required, Validators.min(0)]),
    });
  }

  openModal() {
    this.modalService.open(this.myModal, { centered: true });
  }

  ngOnInit(): void {}
  register() {
    if (this.registerNewUser.valid) {
      this.regErr = SignInAuthError.Correct;
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
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/UsersProfileImages%2Fnav-img_qv.fa2p71r?alt=media&token=131e5508-aa20-4b51-ac1a-a9e212eadc4f',
        avatarCover:
          'https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/UsersProfileImages%2F1200x400.jpg?alt=media&token=cdc696ed-03b4-4d90-8064-548fe3417a1c',
        groups: [],
      };
      this.registerAuth.checkUserFound(newUserBasic).then((r) => {
        if (r.length == 0) {
          this.registerAuth
            .createUserAccount(newUserBasic)
            .then((responce) => {
              this.us.saveInDB(responce.user.uid, newUserBasic, newUserDetails);
              responce.user.sendEmailVerification().then(() => {
                this.router.navigate(['/Login']);
                this.regErr = SignInAuthError.Correct;
              });
            })
            .catch((error) => {
              switch (error.code) {
                case 'auth/wrong-password':
                  this.regErr = SignInAuthError.WrongPassword;
                case 'auth/user-not-found':
                  this.regErr = SignInAuthError.UserNotFound;
                case 'auth/invalid-email':
                  this.regErr = SignInAuthError.InvalidEmail;
              }
              this.openModal();
            });
        } else {
          this.regErr = SignInAuthError.EmailAlreadyInUse;
          this.openModal();
        }
      });
    } else this.openModal();
  }
}
