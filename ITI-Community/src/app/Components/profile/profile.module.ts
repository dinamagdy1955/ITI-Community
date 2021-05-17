import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { ProfileBodyComponent } from './profile-body/profile-body.component';
import { ProfileSideComponent } from './profile-side/profile-side.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileBodyDetailsComponent } from './profile-body/profile-body-details/profile-body-details.component';
import { ProfileBodyHighlightsComponent } from './profile-body/profile-body-highlights/profile-body-highlights.component';
import { ProfileBodyAboutComponent } from './profile-body/profile-body-about/profile-body-about.component';
import { ActivityComponentComponent } from './profile-body/profile-body-activity/activity-component/activity-component.component';
import { ProfileBodyActivityComponent } from './profile-body/profile-body-activity/profile-body-activity.component';
import { ProfileBodyExpComponent } from './profile-body/profile-body-exp/profile-body-exp.component';
import { ExperienceProfileComponent } from './profile-body/profile-body-exp/Experience-profile/Experience-profile.component';
import { ProfileBodyAccomplishmentsComponent } from './profile-body/profile-body-Accomplishments/profile-body-Accomplishments.component';
import { AccomplishmentsProfileComponent } from './profile-body/profile-body-Accomplishments/accomplishments-profile/accomplishments-profile.component';
import { ProfileSideImgComponent } from './profile-side/profile-side-img/profile-side-img.component';
import { ProfileSideViewedComponent } from './profile-side/profile-side-viewed/profile-side-viewed.component';
import { PeopleAlsoViewedComponent } from './profile-side/profile-side-viewed/people-also-viewed/people-also-viewed.component';
import { ProfileSideKnowComponent } from './profile-side/profile-side-know/profile-side-know.component';
import { PeopleYouMayKnowComponent } from './profile-side/profile-side-know/people-you-may-know/people-you-may-know.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainfooterModule } from '../main-footer/mainfooter.module';

const mainProfileRoute: Routes = [
  { path: '', component: MainProfileComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainProfileRoute),
    FormsModule,
    ReactiveFormsModule,
    MainfooterModule,
  ],
  declarations: [
    MainProfileComponent,
    ProfileBodyComponent,
    ProfileSideComponent,
    ProfileBodyDetailsComponent,
    ProfileBodyHighlightsComponent,
    ProfileBodyAboutComponent,
    ActivityComponentComponent,
    ProfileBodyActivityComponent,
    ProfileBodyExpComponent,
    ExperienceProfileComponent,
    ProfileBodyAccomplishmentsComponent,
    AccomplishmentsProfileComponent,
    ProfileSideComponent,
    ProfileSideImgComponent,
    ProfileSideViewedComponent,
    PeopleAlsoViewedComponent,
    ProfileSideKnowComponent,
    PeopleYouMayKnowComponent,
  ],
})
export class ProfileModule {}
