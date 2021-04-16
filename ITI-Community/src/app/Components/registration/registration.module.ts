import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const registrationRoutes: Routes = [
  { path: 'User', component: UserRegistrationComponent },
  //{ path: 'connections', component:ConnectionsComponent },
  { path: '', redirectTo: '/Register/User', pathMatch: 'full' },
  { path: '**', redirectTo: '/User', pathMatch: 'full' },
];

@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(registrationRoutes),
    NgbModule,
    FormsModule,
  ],
})
export class RegistrationModule {}
