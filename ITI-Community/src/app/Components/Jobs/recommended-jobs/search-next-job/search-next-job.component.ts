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
  searchItem: string;
  foundJobs: Job[] | any;
  x;
  city;
  jobName;
  companyName;

  constructor(private service: JobDatabaseService, private router: Router) {
    this.searchItem = '';

    this.foundJobs = [
      {
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
      },
    ];
  }

  ngOnInit(): void {}
}

/*     if (
      this.companyName.length !== 0 ||
      this.jobName.length !== 0 ||
      this.city.length !== 0
    ) {

    } else {
      prompt('at least one field should be filled');
    } */

/*     filterC(){
      this.service.Company(this.companyName).subscribe((res) => {
        this.foundJobs = res.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        console.log(this.foundJobs);
      });
    }
  
  
    filterJ(){
      this.service.Job(this.jobName).subscribe((res) => {
        this.foundJobs = res.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        console.log(this.foundJobs);
      });
    }
  
    filterL(){
      this.service.Location(this.city).subscribe((res) => {
        this.foundJobs = res.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        console.log(this.foundJobs);
      });
    }
    FilterLC(){
      this.service.Location_Company(this.city,this.companyName).subscribe((res) => {
        this.foundJobs = res.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        console.log(this.foundJobs);
      });
      
  
    }
    FilterLJ(){
      this.service.Location_Job(this.city,this.jobName).subscribe((res) => {
        this.foundJobs = res.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        console.log(this.foundJobs);
      });
      
  
    }
    FilterJC(){
      this.service.Location_Job(this.jobName,this.companyName).subscribe((res) => {
        this.foundJobs = res.map((e) => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data(),
          };
        });
        console.log(this.foundJobs);
      });
      
  
    }
  
  
    find() {
      this.router.navigate(['jobs/specificjob'],{queryParams:{company:this.companyName}})
      this.router.navigate(['jobs/specificjob'],{queryParams:{company:this.jobName}})
      
       if (this.companyName.length !== 0&&this.city.length==0&&this.jobName.length==0) {this.filterC()}
      else if (this.companyName.length == 0&&this.city.length !==0&&this.jobName.length ==0) {this.filterL()}
      else if (this.companyName.length == 0&&this.city.length ==0&&this.jobName.length !==0) {this.filterJ()}
  
      else if (this.companyName.length !== 0&&this.city.length !==0&&this.jobName.length ==0) {this.FilterLC()}
      else if (this.companyName.length !== 0&&this.city.length ==0&&this.jobName.length !==0) {this.FilterJC()}
      else if (this.companyName.length == 0&&this.city.length !==0&&this.jobName.length !==0) {this.FilterLJ()}
  
    } */
