import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  declarations: [HomeComponent]
})
export class CategoriesModule { }
