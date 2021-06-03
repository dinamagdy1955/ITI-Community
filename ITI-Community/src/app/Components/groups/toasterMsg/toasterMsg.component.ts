import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastServiceService } from './toastService.service';

@Component({
  selector: 'app-toasterMsg',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text" class="top-center">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: { '[class.ngb-toasts]': 'true' },
  styleUrls: ['./toasterMsg.component.scss']
})
export class ToasterMsgComponent implements OnInit {

  constructor(public toastService: ToastServiceService) { }
  ngOnInit() {
  }
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
