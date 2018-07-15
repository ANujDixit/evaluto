import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UamRoutingModule } from './uam-routing.module';
import { UamComponent } from './uam/uam.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    SharedModule,
    UamRoutingModule
  ],
  declarations: [UamComponent, HomeComponent]
})
export class UamModule { }
