import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestGroupPageComponent } from './request-group-page/request-group-page.component';
import { GroupProfilePageComponent } from './group-profile-page/group-profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const groupRoutes: Routes = [
  { path: 'all-groups', component: RequestGroupPageComponent },
  { path: 'group-profile', component: GroupProfilePageComponent },
  { path: '', redirectTo: '/Group/all-groups', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    RequestGroupPageComponent,
    GroupProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(groupRoutes),
    NgbModule

  ]
})
export class GroupsModule { }
