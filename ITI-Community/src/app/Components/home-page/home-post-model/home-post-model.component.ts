import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-post-model',
  templateUrl: './home-post-model.component.html',
  styleUrls: ['./home-post-model.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomePostModelComponent  {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }
}