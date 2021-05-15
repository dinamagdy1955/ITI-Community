import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFooterComponent } from './mainfooter/main-footer.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

@NgModule({
  declarations: [MainFooterComponent],
  imports: [CommonModule, NgxTwitterTimelineModule],
  exports: [MainFooterComponent],
})
export class MainfooterModule {}
