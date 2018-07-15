import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{  
  path: '',
  component: HomeComponent,
  children: [  
    {path: '', redirectTo: '/admin/uam/users/list', pathMatch: 'full' },
    {path: 'list', component: ListComponent},
    {path: 'create', component: CreateComponent},
    {path: ':questionId', component: ViewComponent},
    {path: ':questionId/edit', component: EditComponent}
  ],
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
