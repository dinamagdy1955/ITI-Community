import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { SavedPostsComponent } from './Components/home-page/saved-posts/saved-posts.component';
import { SpacificSavedPostComponent } from './Components/home-page/spacific-saved-post/spacific-saved-post.component';
import { ForgetPasswordComponent } from './Components/login/forget-password/forget-password.component';
import { LoginComponent } from './Components/login/login.component';
import { ResetPasswordComponent } from './Components/login/reset-password/reset-password.component';
import { NotificationComponent } from './Components/notification/notification.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomePageComponent,
  },
  { path: 'savedPosts', component:SavedPostsComponent },
  { path: 'savedPosts/:id', component:SpacificSavedPostComponent },
 
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'ForgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'ResetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'Notification',
    component: NotificationComponent,
  },
  {
    path: 'Register',
    loadChildren: () =>
      import('./Components/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'FullNetwork',
    loadChildren: () =>
      import('./Components/network/network.module').then(
        (m) => m.NetworkModule
      ),
  },

  {
    path: 'Group',
    loadChildren: () =>
      import('./Components/groups/groups.module').then((m) => m.GroupsModule),
  },
  {
    path: 'Messages',
    loadChildren: () =>
      import('./Components/messages/messages.module').then(
        (m) => m.MessagesModule
      ),
  },

  {
    path: 'profile/:id',
    loadChildren: () =>
      import('./Components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./Components/Jobs/jobsModule').then((m) => m.jobsModule),
  },
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full',
  },
  {
    path: 'notFound',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: '/notFound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
