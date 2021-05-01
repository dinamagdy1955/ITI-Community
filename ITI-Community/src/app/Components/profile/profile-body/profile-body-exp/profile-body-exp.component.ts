import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserProfileService } from '../../Service/user-profile.service';
import { IExperience } from '../ViewModels/iexperience';
@Component({
  selector: 'app-profile-body-exp',
  templateUrl: './profile-body-exp.component.html',
  styleUrls: ['./profile-body-exp.component.scss'],
})
export class ProfileBodyExpComponent implements OnInit {
  @Input() experiences;
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
    private us: UserProfileService
  ) {}

  ngOnInit() {
    this.addExperience = this.FB.group({
      id: this.newExp.id,
      companyName: this.newExp.companyName,
      from: this.newExp.from,
      to: this.newExp.to,
      location: this.newExp.location,
      description: this.newExp.description,
      degree: this.newExp.degree,
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
    if (this.checked) {
      this.addExperience.value.to = 'present';
    }
    this.experiences.push(this.addExperience.value);
    this.us.addUserExp(localStorage.getItem('uid'), this.experiences);
  }

  ch() {
    this.checked = !this.checked;
    this.checked
      ? this.addExperience.controls['to'].disable()
      : this.addExperience.controls['to'].enable();
  }
}
