import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/MainServices/User.service';
import { IUserBasics } from '../../registration/ViewModels/iuser-basics';
import { Job } from '../viewModels/job';
import { JobDatabaseService } from '../service/JobDatabase.service';
import { Observable, Subscription } from 'rxjs';

ActivatedRoute;
@Component({
  selector: 'app-specific-job',
  templateUrl: './specific-job.component.html',
  styleUrls: ['./specific-job.component.scss'],
})
export class SpecificJobComponent implements OnInit, OnDestroy {
  x: number;
  showing: string;
  list: Job[];
  jobId: string;
  selectedJob: Job;
  clickedID: string;
  user: IUserBasics;
  company: string;
  job: string;
  appliedJob: Job;
  @ViewChild('err') myModal;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid: string;
  constructor(
    private service: JobDatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
    this.x = 800;
    this.showing = 'see More';
    // this.list = this.service.getJobs();
    this.selectedJob = {
      id: '',
      data: {
        closingDate: new Date(),
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
        },
        postedDate: new Date(),
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
    this.appliedJob = {
      id: '',
      data: {
        closingDate: new Date(),
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
        },
        postedDate: new Date(),
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
    this.clickedID = '';
    this.company = '';
  }

  ngOnInit(): void {
    let sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.jobId = params.get('id');
      this.company = this.activatedRoute.snapshot.queryParams['company'];
      this.job = this.activatedRoute.snapshot.queryParams['job'];
      if (this.jobId != null) {
        sub = this.service.getJobById(this.jobId).subscribe((res) => {
          this.selectedJob.data = res.data();
        });
        this.subscription.push(sub);
        sub = this.us.getUserBasic(this.uid).subscribe((res) => {
          this.user = res.payload.data();
        });
        this.subscription.push(sub);
      }
    });
    this.subscription.push(sub);
  }

  favorite() {
    let favoriteJob = this.list.find((e) => e.id == this.jobId);
    this.service.favourite(this.uid, favoriteJob.id, favoriteJob.data);
  }

  showMore(id) {
    this.router.navigate(['jobs/specificjob/' + id]);
    this.jobId = id;
    this.showing = 'See More';
    this.x = 800;
  }
  Apply() {
    this.appliedJob = this.list.find((e) => e.id == this.jobId);
    this.service.Apply(this.uid, this.jobId, this.appliedJob.data, this.user);
    this.openModal();
  }
  openModal() {
    this.modalService.open(this.myModal, { centered: true });
  }
  clicked(id) {
    if (this.x > 800) {
      this.showing = 'See More';
      this.x = 800;
    } else {
      this.x = 1500;
      this.showing = 'show less';
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
