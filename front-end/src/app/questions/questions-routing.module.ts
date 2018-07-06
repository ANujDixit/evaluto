import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{
  
  path: 'questions',
  component: HomeComponent,
  children: [
    {path: '', component: ListComponent},
    {path: 'create', component: CreateComponent},
    {path: ':questionId', component: ViewComponent},
    {path: ':questionId/edit', component: EditComponent}
  ],
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
