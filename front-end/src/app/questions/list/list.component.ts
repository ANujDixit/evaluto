import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ApiService } from '../../core/services/api.service';
import { QuestionTypesDialogComponent } from '../question-types-dialog/question-types-dialog.component'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../common/ui.service';

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
              private router: Router,
              private uiService: UiService) { }

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
  
  openGroup(question) {
    console.log(question.title)
  }
  
  addQuestion(): void {
    const dialog = this.dialog.open(QuestionTypesDialogComponent, { height: '200px', width: '300px'});
    dialog.afterClosed()
      .subscribe(selection => {
        if (selection) {
          switch(selection) { 
             case "Single Choice": { 
                this.router.navigate(['/admin/questions/create'], { queryParams: { type: '1'} });
                break; 
             } 
             case "Multiple Choice": { 
                this.router.navigate(['/admin/questions/create'], { queryParams: { type: '2' } }); 
                break; 
             } 
             case "C": {
                console.log("Fair"); 
                break;    
             } 
             case "D": { 
                console.log("Poor"); 
                break; 
             }  
             default: { 
                console.log("Invalid choice"); 
                break;              
             } 
          }
          console.log(selection);
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }
  
  deleteQuestion(id: string) {
    this.api.delete(`admin/questions/${id}`)
      .subscribe(
        resp => {        
          this.fetchQuestions();
          this.uiService.showToast("Question Deleted Successfully", 'Close');
          this.router.navigate(['/admin/questions']);
        }, 
        err => {                
          console.log(err)       
        }
      );
  }

}
