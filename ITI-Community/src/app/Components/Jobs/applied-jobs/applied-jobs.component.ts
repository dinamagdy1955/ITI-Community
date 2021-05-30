import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { JobDatabaseService } from '../service/JobDatabase.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit, OnDestroy {
  appliedJobs;
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

  ngOnInit(): void {
    let sub = this.jobService.getAppliedJobs(this.uid).subscribe((res) => {
      this.appliedJobs = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    });
    this.subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
