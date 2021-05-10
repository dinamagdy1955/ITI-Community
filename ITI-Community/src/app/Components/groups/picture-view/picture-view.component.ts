import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-picture-view',
  templateUrl: './picture-view.component.html',
  styleUrls: ['./picture-view.component.scss']
})
export class PictureViewComponent implements OnInit {
  @Input() img
  closeResult = ''
  constructor(private model: NgbModal) { }

  ngOnInit(): void {
    console.log(this.img)
  }
  open(content) {
    this.model.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
