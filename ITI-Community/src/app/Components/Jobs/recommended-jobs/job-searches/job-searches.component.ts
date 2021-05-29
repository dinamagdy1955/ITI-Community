import { Component, OnInit } from '@angular/core';
import { Job } from '../../viewModels/job';
import { JobDatabaseService } from '../../service/JobDatabase.service';

@Component({
  selector: 'app-job-searches',
  templateUrl: './job-searches.component.html',
  styleUrls: ['./job-searches.component.scss'],
})
export class JobSearchesComponent implements OnInit {
  appliedJobs;

  constructor(private service: JobDatabaseService) {
    this.appliedJobs = [];
  }

  ngOnInit(): void {
    this.service
      .getAppliedJobs(localStorage.getItem('uid'))
      .subscribe((res) => {
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
