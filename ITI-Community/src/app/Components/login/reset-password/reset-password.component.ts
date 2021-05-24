import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/MainServices/User.service';
import { SignInService } from '../signInService/sign-in.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('err') myModal;
  resetPasswordForm: FormGroup;
  fieldTextType: boolean = false;
  confirmFieldTextType: boolean = false;
  code: any;
  constructor(
    private signIn: SignInService,
    private FB: FormBuilder,
    private modalService: NgbModal,
    private activRoute: ActivatedRoute,
    private router: Router,
    private us: UserService
  ) {
    this.resetPasswordForm = this.FB.group({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,38}$/),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,38}$/),
      ]),
    });
  }

  ngOnInit(): void {
    this.code = this.activRoute.snapshot.queryParams['oobCode'];
  }

  openModal() {
    this.modalService.open(this.myModal, { centered: true });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      if (
        this.resetPasswordForm.value.password ==
        this.resetPasswordForm.value.confirmPassword
      ) {
        this.signIn
          .applyActionCode(this.code)
          .then(() => {
            this.signIn
              .resetPassword(this.code, this.resetPasswordForm.value.password)
              .then((res) => {
                this.router.navigate(['/Login']);
              })
              .catch((err) => {
                this.openModal();
              });
          })
          .catch((err) => {
            this.openModal();
          });
      } else this.openModal();
    } else this.openModal();
  }
}
