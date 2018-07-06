import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { QuestionsRoutingModule } from './questions-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    SharedModule,
    QuestionsRoutingModule
  ],
  declarations: [HomeComponent, CreateComponent, EditComponent, ListComponent, ViewComponent]
})
export class QuestionsModule { }
