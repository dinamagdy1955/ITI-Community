import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { SpecificJobComponent } from './specific-job/specific-job.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { RecommendedJobsComponent } from './recommended-jobs/recommended-jobs.component';
const routes: Routes = [
  /* {path:"",redirectTo: '/savedjobs' , pathMatch:"full" }, */
  { path: 'recomendedJobs', component: RecommendedJobsComponent },
  { path: 'savedjobs', component: SavedJobsComponent },
  { path: 'specificjob', component: SpecificJobComponent },
  

];
@NgModule({
  declarations: [ SpecificJobComponent, SavedJobsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxTwitterTimelineModule,
  ],
})
export class jobsModule {}
