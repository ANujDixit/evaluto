import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent as CreateComponentDialog} from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUsersComponent as AddUsersComponentDialog } from './add-users/add-users.component';

@NgModule({
  imports: [
    SharedModule,
    GroupsRoutingModule
  ],
  declarations: [HomeComponent, 
                 CreateComponentDialog, 
                 EditComponent, 
                 ListComponent, 
                 ViewComponent, 
                 UserListComponent, 
                 AddUsersComponentDialog],
  entryComponents: [
    CreateComponentDialog,
    AddUsersComponentDialog
  ]
})
export class GroupsModule { }
