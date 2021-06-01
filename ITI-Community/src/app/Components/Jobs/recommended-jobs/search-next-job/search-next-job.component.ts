import { Component, OnInit } from '@angular/core';
import { Job } from '../../viewModels/job';
import { JobDatabaseService } from '../../service/JobDatabase.service';
import { Router } from '@angular/router';

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

  constructor(private service: JobDatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.companyName = '';
    this.jobName = '';
    this.city = '';
  }
}
