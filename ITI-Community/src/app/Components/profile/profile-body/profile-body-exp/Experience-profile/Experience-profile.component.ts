import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { UserProfileService } from '../../../Service/user-profile.service';
import { IExperience } from '../../ViewModels/iexperience';

@Component({
  selector: 'app-Experience-profile',
  templateUrl: './Experience-profile.component.html',
  styleUrls: ['./Experience-profile.component.scss'],
})
export class ExperienceProfileComponent implements OnInit, OnDestroy {
  @Input() userExperience;
  uidLocal;
  data: Observable<any>;
  subscription: Subscription[] = [];
  editExp: FormGroup;
  today: string = new Date().toISOString().substring(0, 10);
  checked: boolean = false;
  constructor(
    private modalService: NgbModal,
    private usr: UserProfileService,
    private FB: FormBuilder,
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
    this.editExp = this.FB.group({
      id: new FormControl(this.userExperience.experience.id),
      companyName: new FormControl(this.userExperience.experience.companyName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      from: new FormControl(this.userExperience.experience.from, [
        Validators.required,
      ]),
      to: new FormControl(
        this.userExperience.experience.to,
        Validators.required
      ),
      location: new FormControl(this.userExperience.experience.location, [
        Validators.required,
        Validators.minLength(10),
      ]),
      description: new FormControl(this.userExperience.experience.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
      degree: new FormControl(this.userExperience.experience.degree, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
    });
  }

  openEditExperience(content) {
    this.editExp = this.FB.group({
      id: this.userExperience.experience.id,
      companyName: this.userExperience.experience.companyName,
      from: this.userExperience.experience.from,
      to: this.userExperience.experience.to,
      location: this.userExperience.experience.location,
      description: this.userExperience.experience.description,
      degree: this.userExperience.experience.degree,
    });
    if (this.editExp.value.to == 'present') {
      this.checked = true;
      this.checked
        ? this.editExp.controls['to'].disable()
        : this.editExp.controls['to'].enable();
    }
    this.modalService.open(content, { size: 'lg' });
  }

  saveChanges() {
    if (this.editExp.valid) {
      if (this.checked) {
        this.editExp.value.to = 'present';
      }
      let exp: IExperience = {
        id: this.editExp.value.id,
        companyName: this.editExp.value.companyName,
        from: this.editExp.value.from,
        to: this.editExp.value.to,
        location: this.editExp.value.location,
        description: this.editExp.value.description,
        degree: this.editExp.value.degree,
      };
      this.modalService.dismissAll();
      this.usr.updateUserExp(this.uidLocal, exp);
    }
  }

  ch() {
    this.checked = !this.checked;
    this.checked
      ? this.editExp.controls['to'].disable()
      : this.editExp.controls['to'].enable();
  }

  deleteExp() {
    this.usr.deleteUserExp(this.uidLocal, this.userExperience.experience.id);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
