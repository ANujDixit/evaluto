import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsModule } from '../tests/tests.module';
import { SubjectsModule } from '../subjects/subjects.module';

@NgModule({
  imports: [
    CommonModule,
    TestsModule,
    SubjectsModule
  ],
  declarations: []
})
export class CoreModule { }
