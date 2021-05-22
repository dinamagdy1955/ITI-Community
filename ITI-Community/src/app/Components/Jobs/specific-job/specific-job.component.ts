import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../job';
import { JobDatabaseService } from '../jobService/JobDatabase.service';

ActivatedRoute;
@Component({
  selector: 'app-specific-job',
  templateUrl: './specific-job.component.html',
  styleUrls: ['./specific-job.component.css'],
})
export class SpecificJobComponent implements OnInit {
  x: number;
  showing: string;
  list: Job[];
  jobId: string;
  selectedJob: Job;
  clickedID: string;

  constructor(
    private service: JobDatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.x = 800;
    this.showing = 'see More';
    this.list = this.service.getJobs();
    this.selectedJob = {
      id: '',
      data: {
        appliedUsers: {
          closingDate: new Date(),
        },
        companyLogoAvatar: '',
        company: {
          ar: '',
          en: '',
        },
        description: {
          ar: '',
          en: '',
        },
        employmentType: {
          ar: '',
          en: '',
        },
        location: {
          ar: '',
          en: '',
        },
        position: {
          ar: '',
          en: '',
          postedDate: new Date(),
        },
        seniorityLevel: {
          ar: '',
          en: '',
        },
        worksFrom: {
          ar: '',
          en: '',
        },
      },
    };
    this.clickedID="";
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.jobId = params.get('id');
      /* this.selectedJob.id = this.jobId; */
      console.log(this.jobId);

      this.service.getJobById(this.jobId).subscribe((res) => {
        this.selectedJob.data = res.data();
        console.log(res.data());
      });
    });
  }
  showMore(id) {
    this.router.navigate(['jobs/specificjob/' + id]);
    this.jobId = id;
    console.log('ay klma');
    this.showing = 'See More';
    this.x = 800;
  }

  clicked(id) {
    /* console.log(this.jobId); */
    console.log(id);
     /* this.clickedID=id;  */  

    /* if (this.jobId == this.clickedID) { */
      if (this.x > 800) {
        this.showing = 'See More';
        this.x = 800;
      } else {
        this.x = 1500;
        this.showing = 'show less';
      }
 /*    } else {
      this.showing = 'See More';
      this.x = 800;
    } */

  }
}
