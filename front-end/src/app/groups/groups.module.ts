import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { GroupsRoutingModule } from './groups-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent as CreateComponentDialog} from './create/create.component';

@NgModule({
  imports: [
    SharedModule,
    GroupsRoutingModule
  ],
  declarations: [HomeComponent, CreateComponentDialog],
  entryComponents: [
    CreateComponentDialog
  ]
})
export class GroupsModule { }
