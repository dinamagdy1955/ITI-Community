import { Component, OnInit } from '@angular/core';
import { NetworkUserService } from '../../network/Services/user.service';
@Component({
  selector: 'app-home-write-post',
  templateUrl: './home-write-post.component.html',
  styleUrls: ['./home-write-post.component.scss']
})
export class HomeWritePostComponent implements OnInit {
  myData:any
  constructor(
    private usrs:NetworkUserService
  ) { }

  ngOnInit(): void {
    this.myData= this.usrs.data
  }

}

