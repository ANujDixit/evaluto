import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{  
  path: '',
  component: HomeComponent,
  children: [  
    {path: '', redirectTo: '/admin/uam/groups/list', pathMatch: 'full' },
    {path: 'list', component: ListComponent},
    {path: 'create', component: CreateComponent},
    {path: ':groupId', component: ViewComponent},
    {path: ':groupId/edit', component: EditComponent}
  ],
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
