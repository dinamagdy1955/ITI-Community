import { Component, OnInit } from '@angular/core';
import { Job } from '../../viewModels/job';
import { JobDatabaseService } from '../../service/JobDatabase.service';
import { UserService } from 'src/app/MainServices/User.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-job-searches',
  templateUrl: './job-searches.component.html',
  styleUrls: ['./job-searches.component.scss'],
})
export class JobSearchesComponent implements OnInit {
  appliedJobs;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid: string;
  constructor(private service: JobDatabaseService, private us: UserService) {
    this.appliedJobs = [];
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.service.getAppliedJobs(this.uid).subscribe((res) => {
      this.appliedJobs = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
      console.log(this.appliedJobs);
    });
  }
}
