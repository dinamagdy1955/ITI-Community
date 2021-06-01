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
import { InvitationsPageComponent } from './invitations-page/invitations-page.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const networkRoutes: Routes = [
  { path: 'Network', component: NetworkPageComponent },
  { path: 'connections', component: ConnectionsComponent },
  { path: 'sentRequests', component: AllSentRequestesPageComponent },
  { path: 'RequestsInvitation', component: InvitationsPageComponent },
  { path: '', redirectTo: '/FullNetwork/Network', pathMatch: 'full' },
  { path: '**', redirectTo: '/Network', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    NetworkPageComponent,
    NetworkFriendRequestComponent,
    NetworkSugesstionCardComponent,
    ManagMyNetworkCardComponent,
    ConnectionsComponent,
    SentRequestesCardComponent,
    AllSentRequestesPageComponent,
    InvitationsPageComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    RouterModule.forChild(networkRoutes),
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent], 
})

export class NetworkModule {}
export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
