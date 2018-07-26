import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TestsRoutingModule } from './tests-routing.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    SharedModule,
    TestsRoutingModule
  ],
  declarations: [HomeComponent, ListComponent, EditComponent, ViewComponent, CreateComponent]
})
export class TestsModule { }
