import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { SpecificJobComponent } from './specific-job/specific-job.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { RecommendedJobsComponent } from './recommended-jobs/recommended-jobs.component';
import { SearchNextJobComponent } from './recommended-jobs/search-next-job/search-next-job.component';
import { RecomendedForYouComponent } from './recommended-jobs/recomended-for-you/recomended-for-you.component';
import { JobSearchesComponent } from './recommended-jobs/job-searches/job-searches.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MainfooterModule } from '../main-footer/mainfooter.module';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ClipboardModule } from 'ngx-clipboard';
const routes: Routes = [
  { path: '', component: RecommendedJobsComponent },
  { path: 'savedjobs', component: SavedJobsComponent },
  { path: 'specificjob', component: SpecificJobComponent },
  { path: 'appliedJobs', component: AppliedJobsComponent },
];
@NgModule({
  declarations: [
    SpecificJobComponent,
    SavedJobsComponent,
    SearchNextJobComponent,
    RecommendedJobsComponent,
    RecomendedForYouComponent,
    JobSearchesComponent,
    AppliedJobsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxTwitterTimelineModule,
    Ng2SearchPipeModule,
    MainfooterModule,
    ClipboardModule,
  ],
})
export class jobsModule {}
