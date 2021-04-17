import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { SpecificJobComponent } from './specific-job/specific-job.component';
import { JobsHomeComponent } from './JobsHome/jobsHome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
const routes: Routes = [
  /* {path:"",redirectTo: '/savedjobs' , pathMatch:"full" }, */
  { path: 'savedjobs', component: SavedJobsComponent },
  { path: 'specificjob', component: SpecificJobComponent },
  { path: '', component: JobsHomeComponent },
];
@NgModule({
  declarations: [JobsHomeComponent, SpecificJobComponent, SavedJobsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxTwitterTimelineModule,
  ],
})
export class jobsModule {}
