import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { HomeComponent as QuestionsHomeComponent } from '../questions/home/home.component';
import { CreateComponent as QuestionsCreateComponent } from '../questions/create/create.component';
import { ListComponent as QuestionsListComponent} from '../questions/list/list.component';
import { ViewComponent as QuestionsViewComponent } from '../questions/view/view.component';
import { EditComponent as QuestionsEditComponent } from '../questions/edit/edit.component';

import { HomeComponent as UsersHomeComponent } from '../users/home/home.component';
import { CreateComponent as UsersCreateComponent } from '../users/create/create.component';
import { ListComponent as UsersListComponent} from '../users/list/list.component';
import { ViewComponent as UsersViewComponent } from '../users/view/view.component';
import { EditComponent as UsersEditComponent } from '../users/edit/edit.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, 
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'questions', 
        component: QuestionsHomeComponent,
        children: [
          {path: '', component: QuestionsListComponent},
          {path: 'create', component: QuestionsCreateComponent},
          {path: ':questionId', component: QuestionsViewComponent},
          {path: ':questionId/edit', component: QuestionsEditComponent}
        ]
      },
      { path: 'users', 
        component: UsersHomeComponent,
        children: [
          {path: '', component: UsersListComponent},
          {path: 'create', component: UsersCreateComponent},
          {path: ':userId', component: UsersViewComponent},
          {path: ':userId/edit', component: UsersEditComponent}
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
