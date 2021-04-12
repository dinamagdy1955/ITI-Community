import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';

const routes: Routes = [

  {path: 'HOME', component:HomePageComponent},
  {
    path: 'Group',
    loadChildren: () => import('./Components/groups/groups.module')
      .then(m => m.GroupsModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
