import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ApiService } from '../../core/services/api.service';
import { QuestionTypesDialogComponent } from '../question-types-dialog/question-types-dialog.component'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  
  questions: any;
  private sub: Subscription = new Subscription();

  constructor(private api: ApiService,
              public dialog: MatDialog, 
              private router: Router) { }

  ngOnInit() {
    this.fetchQuestions();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  fetchQuestions(){
    this.sub = this.api.get('admin/questions')
      .subscribe(questions => this.questions = questions );
  }
  
  numberToChar(i: number) {
    return String.fromCharCode(97 + i)
  }

}
