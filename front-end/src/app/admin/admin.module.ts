import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  declarations: [AdminComponent, UserManagementComponent, AdminHomeComponent]
})
export class AdminModule { }
