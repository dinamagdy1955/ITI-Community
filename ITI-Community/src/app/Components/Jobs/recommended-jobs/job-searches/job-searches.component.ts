import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-searches',
  templateUrl: './job-searches.component.html',
  styleUrls: ['./job-searches.component.scss']
})
export class JobSearchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
/*   let sub4 = this.getall.GroupPosts(this.GroupId).subscribe(res => {
    this.postGroupList = res.map(e => {
      return {
        id: e.payload.doc.id,
        data: e.payload.doc.data()
      }
    })
  })  */
}
