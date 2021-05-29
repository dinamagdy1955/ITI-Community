import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { HomePostsService } from '../../home-page/HomeServices/home-posts.service';
import { JobDatabaseService } from '../service/JobDatabase.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss'],
})
export class SavedJobsComponent implements OnInit, OnDestroy {
  favoriteArray;
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid;
  noSavedPosts: number;
  constructor(
    private jobService: JobDatabaseService,
    private router: Router,
    private us: UserService,
    private postsService: HomePostsService
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
    let sub = this.jobService.getFavorite(this.uid).subscribe((res) => {
      this.favoriteArray = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    });
    this.subscription.push(sub);
    sub = this.postsService.getSavedPosts(this.uid).subscribe((res) => {
      this.noSavedPosts = res.length;
    });
    this.subscription.push(sub);
  }
  details(id) {
    this.router.navigate(['jobs/specificjob/' + id]);
  }
  unsave(jobId) {
    this.jobService.deleteFavorite(jobId, this.uid);
  }
  toRecommended() {
    this.router.navigate(['jobs/']);
  }
  toSavedPosts() {
    this.router.navigate(['/savedPosts']);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
