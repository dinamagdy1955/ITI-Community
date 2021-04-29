import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-body-exp',
  templateUrl: './profile-body-exp.component.html',
  styleUrls: ['./profile-body-exp.component.scss'],
})
export class ProfileBodyExpComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
