import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { durations } from '../../shared/data/durations.data';
import { ApiService } from '../../core/services/api.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  testCreateFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  durations: any[] = durations;
  instructions: any[]; 
  categories: any[]; 

  @ViewChild('stepper') stepper: MatStepper;
  
  isEditable = false;

  constructor(private _formBuilder: FormBuilder,
              private api: ApiService ) { }

  ngOnInit() {
    this.fetchData();
    this.testCreateFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      category: '',
      duration: '',  
      total_questions: '',
      total_marks: '',
      template: '',
      instruction: ''  
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
     this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.forthFormGroup = this._formBuilder.group({
      forthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  fetchData(){
    this.api.get('admin/tests/new')
    .subscribe(
      resp => {  
        this.categories = resp.categories
        this.instructions = resp.instructions
      },
      errMsg => {
        console.log(errMsg)
      }
    );
  }

  createTest(){
    this.stepper.next();
    console.log("hello")
  }



}
