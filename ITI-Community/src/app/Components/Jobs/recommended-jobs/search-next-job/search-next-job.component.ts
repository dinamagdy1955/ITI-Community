import { Component, OnInit } from '@angular/core';
import { Job } from '../../viewModels/job';
import { JobDatabaseService } from '../../service/JobDatabase.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';

@Component({
  selector: 'app-search-next-job',
  templateUrl: './search-next-job.component.html',
  styleUrls: ['./search-next-job.component.scss'],
})
export class SearchNextJobComponent implements OnInit {
  x;
  city;
  jobName;
  companyName;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid: string;
  Lang:string;
  constructor(
    private jobService: JobDatabaseService,
    private router: Router,
    private us: UserService
  ) {
    this.Lang=localStorage.getItem('Lang');
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.companyName = '';
    this.jobName = '';
    this.city = '';
  }
  search() {
    this.jobService.saveSearch(
      this.uid,
      this.companyName,
      this.city,
      this.jobName
    );
    this.router.navigate(['/jobs/specificjob'], {
      queryParams: {
        company: this.companyName,
        position: this.jobName,
        location: this.city,
      },
    });
  }
}
