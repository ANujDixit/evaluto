import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-question-types-dialog',
  templateUrl: './question-types-dialog.component.html',
  styleUrls: ['./question-types-dialog.component.scss']
})
export class QuestionTypesDialogComponent implements OnInit {
  
  questionTypes = ['Single Choice', 'Multiple Choice', 'True and False', 'Fill in the Blanks', 'Match the following']
  layoutTypes = ['Text Only', 'Both Text and Image']

  choosenQuestionType: string = 'Single Choice';
  choosenLayoutType: string = 'Text Only';

  constructor(public dialogRef: MatDialogRef<QuestionTypesDialogComponent>) { }

  ngOnInit() {
  }
  
  confirmSelection() {
    this.dialogRef.close({ selectedQuestionType: this.choosenQuestionType, 
                           selectedLayoutType: this.choosenLayoutType});
  }
}