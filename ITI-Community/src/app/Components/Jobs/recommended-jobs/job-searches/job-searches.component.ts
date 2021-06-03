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
  searches = [];
  Lang: string;
  constructor(private jobService: JobDatabaseService, private us: UserService) {
    this.Lang = localStorage.getItem('lang');
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.jobService.getSavedSearches(this.uid).subscribe((res) => {
      this.searches = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    });
  }

  deleteSaved(searchId) {
    this.jobService.deleteSavedSearches(this.uid, searchId);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
