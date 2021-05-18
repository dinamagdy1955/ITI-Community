import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginComponent } from './Components/login/login.component';
import { NotificationComponent } from './Components/notification/notification.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
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
      import('./Components/Jobs/jobsModule').then(
        (m) => m.jobsModule
      ),
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
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
