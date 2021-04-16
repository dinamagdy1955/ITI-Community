import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMessagesComponent } from './all-messages/all-messages.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const messagesRoute: Routes = [
  { path: 'all-messages', component: AllMessagesComponent },
  { path: '', redirectTo: '/Messages/all-messages', pathMatch: 'full' },
  { path: '**', redirectTo: '/Messages', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AllMessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(messagesRoute),
    NgbModule
  ]
})
export class MessagesModule { }
