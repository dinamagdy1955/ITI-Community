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
  list: Job[];
  searchItem: string;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  constructor(
    private jobService: JobDatabaseService,
    private router: Router,
    private us: UserService
  ) {
    this.list = this.jobService.getJobs();
    this.searchItem = '';
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {}
  favorite(id) {
    let favoriteJob = this.list.find((e) => e.id == id);
    this.jobService.favourite(this.uid, favoriteJob.id, favoriteJob.data);
  }
  toSavedJobs() {
    this.router.navigate(['jobs/savedjobs']);
  }
}
