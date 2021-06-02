import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/MainServices/User.service';
import { Job } from '../viewModels/job';
import { JobDatabaseService } from '../service/JobDatabase.service';
import { Observable, Subscription } from 'rxjs';
import { BranchDatabaseService } from '../../Branches/Services/database.service';
import { TrackDatabaseService } from '../../Tracks/Services/database.service';
import { IUserDetails } from '../../registration/ViewModels/iuser-details';

ActivatedRoute;
@Component({
  selector: 'app-specific-job',
  templateUrl: './specific-job.component.html',
  styleUrls: ['./specific-job.component.scss'],
})
export class SpecificJobComponent implements OnInit, OnDestroy {
  x: number;
  showing: string;
  list = [];
  savedJobs = [];
  appliedJobs = [];
  jobId: string;
  selectedJob;
  clickedID: string;
  company: string;
  position: string;
  location: string;
  appliedJob: Job;
  @ViewChild('sent') sentModal;
  @ViewChild('details') detailsModal;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid: string;
  userData: IUserDetails;
  userTrack: string;
  userBranch: string;
  keyWordsSearch;
  Lang: string;
  constructor(
    private jobService: JobDatabaseService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private us: UserService,
    private bs: BranchDatabaseService,
    private ts: TrackDatabaseService,
    private router: Router
  ) {
    this.Lang = localStorage.getItem('lang');
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
    this.us.getUserData(this.uid).subscribe((res) => {
      this.userData = res.payload.data();
      this.ts
        .getTrackById(this.userData.track)
        .subscribe((res) => (this.userTrack = res.data()['name']));
      this.bs
        .getBrancheById(this.userData.branch)
        .subscribe((res) => (this.userBranch = res.data()['name']));
    });
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
  }

  ngOnInit(): void {
    let sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.jobId = this.activatedRoute.snapshot.queryParams['id'];
      this.company = this.activatedRoute.snapshot.queryParams['company'];
      this.position = this.activatedRoute.snapshot.queryParams['position'];
      this.location = this.activatedRoute.snapshot.queryParams['location'];
      this.showing = 'See More';
      this.x = 800;
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
        this.jobId = undefined;
        this.jobService
          .mergeCLP(this.company, this.location, this.position)
          .subscribe((res) => {
            res.map((e) => {
              let found = false;
              this.list.find((s) => {
                if (s.id == e.payload.doc.id) found = true;
              });
              if (!found)
                this.list.push({
                  id: e.payload.doc.id,
                  data: e.payload.doc.data(),
                });
            });
            this.selectedJob = this.list[0];
          });
      } else {
        this.jobId = undefined;
        this.selectedJob = undefined;
        this.jobService.getJobs().subscribe((res) => {
          this.list = res.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
            };
          });
          this.selectedJob = this.list[0];
        });
      }
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
  showMore(job) {
    if (this.jobId != undefined) {
      this.router.navigate(['/jobs/specificjob'], {
        queryParams: { id: job.id },
      });
    } else this.selectedJob = job;
    this.showing = 'See More';
    this.x = 800;
  }
  Apply() {
    this.appliedJob = this.list.find((e) => e.id == this.selectedJob.id);
    this.jobService.Apply(
      this.uid,
      this.selectedJob.id,
      this.appliedJob.data,
      this.userData
    );
    this.openSentModal();
  }
  openSentModal() {
    this.modalService.open(this.sentModal, { centered: true });
  }
  openDetailsModal() {
    this.modalService.open(this.detailsModal, { centered: true, size: 'lg' });
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
