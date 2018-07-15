import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { HomeComponent as UsersHomeComponent } from '../users/home/home.component';
import { CreateComponent as UsersCreateComponent } from '../users/create/create.component';
import { ListComponent as UsersListComponent} from '../users/list/list.component';
import { ViewComponent as UsersViewComponent } from '../users/view/view.component';
import { EditComponent as UsersEditComponent } from '../users/edit/edit.component';

import { HomeComponent as CategoriesHomeComponent } from '../categories/home/home.component';
import { HomeComponent as GroupsHomeComponent } from '../groups/home/home.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, 
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },  
      { path: 'quiz', loadChildren: '../quiz/quiz.module#QuizModule'},
      { path: 'uam', loadChildren: '../uam/uam.module#UamModule'},

      { path: 'users', 
        component: UsersHomeComponent,
        children: [
          {path: '', component: UsersListComponent},
          {path: 'create', component: UsersCreateComponent},
          {path: ':userId', component: UsersViewComponent},
          {path: ':userId/edit', component: UsersEditComponent}
        ]
      },
      { path: 'categories', 
        component: CategoriesHomeComponent
      },
      { path: 'groups', 
        component: GroupsHomeComponent
      } 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
