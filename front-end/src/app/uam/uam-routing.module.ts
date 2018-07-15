import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent as UamHomeComponent } from './home/home.component';
import { UamComponent } from './uam/uam.component';

const routes: Routes = [
  { path: '', 
    component: UamComponent, 
    children: [
      { path: '', redirectTo: '/admin/uam/home', pathMatch: 'full' },
      { path: 'home', component: UamHomeComponent },       
      { path: 'users', loadChildren: '../users/users.module#UsersModule'},
      { path: 'groups', loadChildren: '../groups/groups.module#GroupsModule'},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UamRoutingModule { }
