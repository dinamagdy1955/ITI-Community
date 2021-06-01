import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { ChatsService } from '../../messages/Service/chats.service';
import { JobDatabaseService } from '../service/JobDatabase.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit, OnDestroy {
  @ViewChild('friends') myFriendsModel;
  appliedJobs: any[] = [];
  data: Observable<any>;
  subscription: Subscription[] = [];
  uid: string;
  jobMsgId: string;
  constructor(
    private jobService: JobDatabaseService,
    private us: UserService,
    private msgService: ChatsService,
    private modalService: NgbModal
  ) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.uid = res.id;
      }
    });
    this.subscription.push(sub);
  }

  ngOnInit(): void {
    let sub = this.jobService.getAppliedJobs(this.uid).subscribe((res) => {
      this.appliedJobs = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        };
      });
    });
    this.subscription.push(sub);
  }
  openModal(jobId) {
    this.modalService.open(this.myFriendsModel, { centered: true });
    this.jobMsgId = jobId;
  }
  // sendJobinMsg(recId) {
  //   this.msgService.newChat()
  // }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
