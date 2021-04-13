import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/MainHeader/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HomeAddToYourFeedComponent } from './Components/home-page/home-add-to-your-feed/home-add-to-your-feed.component';
import { HomeDropdowenComponent } from './Components/home-page/home-dropdowen/home-dropdowen.component';
import { HomePostBodyComponent } from './Components/home-page/home-post-body/home-post-body.component';
import { HomeProfileCardComponent } from './Components/home-page/home-profile-card/home-profile-card.component';
import { HomeWritePostComponent } from './Components/home-page/home-write-post/home-write-post.component';
import { HomePostModelComponent } from './Components/home-page/home-post-model/home-post-model.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    HomeAddToYourFeedComponent,
    HomeDropdowenComponent,
    HomePostBodyComponent,
    HomeProfileCardComponent,
    HomeWritePostComponent,
    HomePostModelComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
