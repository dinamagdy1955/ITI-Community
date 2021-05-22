import { Component, OnInit } from '@angular/core';
import { JobDatabaseService } from '../../jobService/JobDatabase.service';
import {Job} from '../../job'
@Component({
  selector: 'app-recomended-for-you',
  templateUrl: './recomended-for-you.component.html',
  styleUrls: ['./recomended-for-you.component.scss']
})
export class RecomendedForYouComponent implements OnInit {

  list:Job[];


  constructor( private service:JobDatabaseService ) { 
    
    this.list=service.getJobs();
    
    
    
  }

  ngOnInit(): void {
  }

}
