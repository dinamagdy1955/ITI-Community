import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { JobDatabaseService } from '../service/JobDatabase.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css'],
})
export class SavedJobsComponent implements OnInit {
  favoriteArray;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  constructor(
    private service: JobDatabaseService,
    private router: Router,
    private us: UserService
  ) {
    this.favoriteArray = [];
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    this.service.getFavorite(this.uid).subscribe((res) => {
      this.favoriteArray = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    });
  }
  details(id) {
    this.router.navigate(['jobs/specificjob/' + id]);
  }
  unsave(jobId) {
    this.service.deleteFavorite(jobId, this.uid);
  }

  toRecommended() {
    this.router.navigate(['jobs/']);
  }
}
