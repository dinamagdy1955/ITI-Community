import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserProfileService } from '../../Service/user-profile.service';
import { IExperience } from '../ViewModels/iexperience';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-profile-body-exp',
  templateUrl: './profile-body-exp.component.html',
  styleUrls: ['./profile-body-exp.component.scss'],
})
export class ProfileBodyExpComponent implements OnInit, OnDestroy {
  @Input() userExperiences;
  uidLocal;
  data: Observable<any>;
  subscription: Subscription[] = [];
  today: string = new Date().toISOString().substring(0, 10);
  checked: boolean = false;
  addExperience: FormGroup;
  newExp: IExperience = {
    id: null,
    companyName: '',
    from: null,
    to: null,
    location: '',
    description: '',
    degree: '',
  };
  constructor(
    private modalService: NgbModal,
    private FB: FormBuilder,
    private usr: UserProfileService,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uidLocal = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit() {
    this.addExperience = this.FB.group({
      id: new FormControl(this.newExp.id),
      companyName: new FormControl(this.newExp.companyName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      from: new FormControl(this.newExp.from, [Validators.required]),
      to: new FormControl(this.newExp.to, Validators.required),
      location: new FormControl(this.newExp.location, [
        Validators.required,
        Validators.minLength(10),
      ]),
      description: new FormControl(this.newExp.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
      degree: new FormControl(this.newExp.degree, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
    });
    this.checked
      ? this.addExperience.controls['to'].disable()
      : this.addExperience.controls['to'].enable();
  }
  open(content) {
    this.addExperience = this.FB.group({
      id: this.newExp.id,
      companyName: this.newExp.companyName,
      from: this.newExp.from,
      to: this.newExp.to,
      location: this.newExp.location,
      description: this.newExp.description,
      degree: this.newExp.degree,
    });
    this.modalService.open(content, { size: 'lg' });
  }

  saveChanges() {
    if (this.addExperience.valid) {
      if (this.checked) {
        this.addExperience.value.to = 'present';
      }
      this.modalService.dismissAll();
      this.userExperiences.experiences.push(this.addExperience.value);
      this.usr.addUserExp(this.uidLocal, this.userExperiences.experiences);
    }
  }

  ch() {
    this.checked = !this.checked;
    this.checked
      ? this.addExperience.controls['to'].disable()
      : this.addExperience.controls['to'].enable();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
