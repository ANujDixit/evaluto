import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, 
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'users', component: UserManagementComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
