import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { QuestionsModule } from '../questions/questions.module';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    QuestionsModule,
    UsersModule,
    CategoriesModule,
  ],
  declarations: [AdminComponent, AdminHomeComponent]
})
export class AdminModule { }
