import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent as QuizHomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', 
    component: QuizComponent, 
    children: [
      { path: '', redirectTo: '/admin/quiz/home', pathMatch: 'full' },
      { path: 'home', component: QuizHomeComponent },       
      { path: 'questions', loadChildren: '../questions/questions.module#QuestionsModule'},
      { path: 'tests', loadChildren: '../tests/tests.module#TestsModule'},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
