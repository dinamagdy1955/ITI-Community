import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HomeAddToYourFeedComponent } from './Components/home-page/home-add-to-your-feed/home-add-to-your-feed.component';
import { HomeDropdowenComponent } from './Components/home-page/home-dropdowen/home-dropdowen.component';
import { HomePostBodyComponent } from './Components/home-page/home-post-body/home-post-body.component';
import { HomeProfileCardComponent } from './Components/home-page/home-profile-card/home-profile-card.component';
import { HomeWritePostComponent } from './Components/home-page/home-write-post/home-write-post.component';
import { HomePostModelComponent } from './Components/home-page/home-post-model/home-post-model.component';
import { HeaderComponent } from './Components/MainHeader/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { ErrorComponent } from './Components/error/error.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { MainfooterModule } from './Components/main-footer/mainfooter.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EditHomePostComponent } from './Components/home-page/edit-home-post/edit-home-post.component';
import { HomePostCommentComponent } from './Components/home-page/home-post-comment/home-post-comment.component';
import { HomeEditCommentComponent } from './Components/home-page/home-edit-comment/home-edit-comment.component';
import { HCommentFormComponent } from './Components/home-page/hcomment-form/hcomment-form.component';
import { UserService } from './MainServices/User.service';
import { ForgetPasswordComponent } from './Components/login/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/login/reset-password/reset-password.component';
import { SavedPostsComponent } from './Components/home-page/saved-posts/saved-posts.component';
import { ClipboardModule } from 'ngx-clipboard';
import { SpacificSavedPostComponent } from './Components/home-page/spacific-saved-post/spacific-saved-post.component';
import { GroupsModule } from './Components/groups/groups.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
export function initializeApp1(userService: UserService) {
  return (): Promise<any> => {
    return userService.Init();
  };
}

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
    LoginComponent,
    ErrorComponent,
    NotificationComponent,
    EditHomePostComponent,
    HomePostCommentComponent,
    HomeEditCommentComponent,
    HCommentFormComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SavedPostsComponent,
    SpacificSavedPostComponent,
  ],
  imports: [
    BrowserModule,
     InfiniteScrollModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTwitterTimelineModule,
    MainfooterModule,
    HttpClientModule,
    ClipboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [UserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
