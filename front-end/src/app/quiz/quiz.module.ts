import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  imports: [
    SharedModule,
    QuizRoutingModule
  ],
  declarations: [HomeComponent, QuizComponent]
})
export class QuizModule { }
