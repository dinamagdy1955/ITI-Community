import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../viewModels/job';
import { JobDatabaseService } from '../../service/JobDatabase.service';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-job-searches',
  templateUrl: './job-searches.component.html',
  styleUrls: ['./job-searches.component.scss'],
})
export class JobSearchesComponent implements OnInit, OnDestroy {
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid: string;
  constructor(private jobService: JobDatabaseService, private us: UserService) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
