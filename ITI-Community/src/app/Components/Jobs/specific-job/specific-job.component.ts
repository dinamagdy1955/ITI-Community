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
  list;
  savedJobs = [];
  appliedJobs = [];
  jobId: string;
  selectedJob;
  clickedID: string;
  company: string;
  position: string;
  location: string;
  appliedJob: Job;
  @ViewChild('err') myModal;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid: string;
  userData;
  constructor(
    private jobService: JobDatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
        this.userData = res;
      }
    });
    this.subscription.push(sub);
    this.x = 800;
    this.showing = 'see More';
  }

  ngOnInit(): void {
    let sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.jobId = this.activatedRoute.snapshot.queryParams['id'];
      this.company = this.activatedRoute.snapshot.queryParams['company'];
      this.position = this.activatedRoute.snapshot.queryParams['position'];
      this.location = this.activatedRoute.snapshot.queryParams['location'];
      if (this.jobId != undefined) {
        this.jobService.getJobById(this.jobId).subscribe((res) => {
          this.selectedJob = {
            id: res.payload.id,
            data: res.payload.data(),
          };
        });
        this.jobService.getJobs().subscribe((res) => {
          this.list = res.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
            };
          });
        });
      } else if (
        this.company != undefined ||
        this.position != undefined ||
        this.location != undefined
      ) {
      } else {
        this.selectedJob = undefined;
        this.jobService.getJobs().subscribe((res) => {
          this.list = res.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
            };
          });
        });
      }
      this.jobService.getFavorite(this.uid).subscribe((res) => {
        this.savedJobs = res.map((e) => {
          return e.payload.doc.id;
        });
      });
      this.jobService.getAppliedJobs(this.uid).subscribe((res) => {
        this.appliedJobs = res.map((e) => {
          return e.payload.doc.id;
        });
      });

      // console.log(this.jobId);
      // console.log(this.company);
      // console.log(this.location);
      // console.log(this.position);

      // if (this.jobId != null) {
      //   sub = this.service.getJobById(this.jobId).subscribe((res) => {
      //     this.selectedJob.data = res.data();
      //   });
      //   this.subscription.push(sub);
      //   sub = this.us.getUserBasic(this.uid).subscribe((res) => {
      //     this.user = res.payload.data();
      //   });
      //   this.subscription.push(sub);
      // }
    });

    this.subscription.push(sub);
  }

  saveUnsave(jobId) {
    if (this.savedJobs.includes(jobId)) {
      this.jobService.deleteFavorite(jobId, this.uid);
    } else {
      let favoriteJob = this.list.find((e) => e.id == jobId);
      this.jobService.favourite(this.uid, favoriteJob.id, favoriteJob.data);
    }
  }
  showMore(jid) {
    this.jobId = jid;
    this.showing = 'See More';
    this.x = 800;
  }
  Apply() {
    this.appliedJob = this.list.find((e) => e.id == this.jobId);
    this.jobService.Apply(
      this.uid,
      this.jobId,
      this.appliedJob.data,
      this.userData
    );
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
