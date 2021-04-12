import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestGroupPageComponent } from './request-group-page/request-group-page.component';
import { GroupProfilePageComponent } from './group-profile-page/group-profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeftSideGroupComponent } from './left-side-group/left-side-group.component';
import { CenterGroupPageComponent } from './center-group-page/center-group-page.component';
import { RightSideGroupComponent } from './right-side-group/right-side-group.component';

const groupRoutes: Routes = [
  { path: 'all-groups', component: RequestGroupPageComponent },
  { path: 'group-profile', component: GroupProfilePageComponent },
  { path: '', redirectTo: '/Group/all-groups', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    RequestGroupPageComponent,
    GroupProfilePageComponent,
    LeftSideGroupComponent,
    CenterGroupPageComponent,
    RightSideGroupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(groupRoutes),
    NgbModule

  ]
})
export class GroupsModule { }
