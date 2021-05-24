import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/MainServices/User.service';
import { SignInService } from '../signInService/sign-in.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('err') myModal;
  forgetPassword: FormGroup;
  constructor(
    private signIn: SignInService,
    private FB: FormBuilder,
    private us: UserService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.forgetPassword = this.FB.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
    });
  }

  openModal() {
    this.modalService.open(this.myModal, { centered: true });
  }

  ForgetPassword() {
    if (this.forgetPassword.valid) {
      this.signIn
        .forgetPassword(this.forgetPassword.value.email)
        .then((res) => {
          this.router.navigate(['/Login']);
        })
        .catch((err) => {
          this.openModal();
        });
    } else {
      this.openModal();
    }
  }
}
