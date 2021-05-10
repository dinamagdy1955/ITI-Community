import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkPageComponent } from './network-page/network-page.component';
import { NetworkFriendRequestComponent } from './network-page/network-friend-request/network-friend-request.component';
import { NetworkSugesstionCardComponent } from './network-page/network-sugesstion-card/network-sugesstion-card.component';
import { ManagMyNetworkCardComponent } from './network-page/manag-my-network-card/manag-my-network-card.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionsComponent } from './connections/connections.component';
import { SentRequestesCardComponent } from './network-page/sent-requestes-card/sent-requestes-card.component';
import { AllSentRequestesPageComponent } from './all-sent-requestes-page/all-sent-requestes-page.component';


const networkRoutes: Routes = [
  { path: 'Network', component:NetworkPageComponent },
  { path: 'connections', component:ConnectionsComponent },
  { path: 'sentRequests', component:AllSentRequestesPageComponent },
  { path: '', redirectTo: '/FullNetwork/Network', pathMatch: 'full' },
  { path: '**', redirectTo: '/Network', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    NetworkPageComponent,
    NetworkFriendRequestComponent,
    NetworkSugesstionCardComponent,
    ManagMyNetworkCardComponent,
    ConnectionsComponent,
    SentRequestesCardComponent,
    AllSentRequestesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(networkRoutes),
    NgbModule
  ]
})
export class NetworkModule { }
