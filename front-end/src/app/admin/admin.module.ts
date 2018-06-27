import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';


@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent, UserManagementComponent, AdminHomeComponent]
})
export class AdminModule { }
