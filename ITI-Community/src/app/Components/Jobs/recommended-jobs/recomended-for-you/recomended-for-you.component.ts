import { Component, OnInit } from '@angular/core';
import { JobDatabaseService } from '../../service/JobDatabase.service';
import { Job } from '../../viewModels/job';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-recomended-for-you',
  templateUrl: './recomended-for-you.component.html',
  styleUrls: ['./recomended-for-you.component.scss'],
})
export class RecomendedForYouComponent implements OnInit {
  savedJobs: any[] = [];
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  list = [];
  constructor(
    private jobService: JobDatabaseService,
    private router: Router,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }
  ngOnInit(): void {
    this.jobService.getJobs().subscribe((res) => {
      this.list = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    });
    this.jobService.getFavorite(this.uid).subscribe((res) => {
      this.savedJobs = res.map((e) => {
        return e.payload.doc.id;
      });
    });
  }
  saveUnsave(jobId) {
    if (this.savedJobs.includes(jobId)) {
      this.jobService.deleteFavorite(jobId, this.uid);
    } else {
      let favoriteJob = this.list.find((e) => e.id == jobId);
      this.jobService.favourite(this.uid, favoriteJob.id, favoriteJob.data);
    }
  }
  toSavedJobs() {
    this.router.navigate(['jobs/savedjobs']);
  }
}
