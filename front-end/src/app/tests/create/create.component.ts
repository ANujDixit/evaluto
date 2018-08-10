import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { durations } from '../../shared/data/durations.data';
import { ApiService } from '../../core/services/api.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  testFormGroup: FormGroup;
  sectionFormGroup: FormGroup;
  settingFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  durations: any[] = durations;
  instructions: any[]; 
  categories: any[]; 
  test: any;
  step = 0;
  sections: any;

  @ViewChild('stepper') stepper: MatStepper;
  
  isEditable = true;

  constructor(private _formBuilder: FormBuilder,
              private api: ApiService ) { }

  ngOnInit() {
    this.fetchData();
    this.testFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      category: '',
      duration: '',  
      total_questions: '',
      total_marks: '',
      template: '',
      instruction: ''  
    });

    this.sectionFormGroup = this._formBuilder.group({     
      sections: this._formBuilder.array([ this.createSection(), this.createSection(), this.createSection(),  ])
    });    

    this.settingFormGroup = this._formBuilder.group({
      group_questions_section_wise: ['1', Validators.required],
      sections_shuffle: ['0', Validators.required],
      questions_shuffle: ['0', Validators.required],
      options_shuffle: ['0', Validators.required]
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

  createSection(): FormGroup {
    return this._formBuilder.group({
      name: ''   
    });
  }

  get sectionData() { return this.sectionFormGroup.get('sections');}

  addSections(): void {
    this.sections = this.sectionFormGroup.get('sections') as FormArray;
    this.sections.push(this.createSection());
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
    const test = { "test": this.testFormGroup.value }  
    this.api.post('admin/tests', test)
    .subscribe(
      resp => {  
        this.test = resp
        this.stepper.next();
      },
      errMsg => {
        console.log(errMsg)
      }
    );
  }
  
  createSetting(){   
    const setting = { "setting": this.settingFormGroup.value }  
    this.api.post(`admin/tests/${this.test.id}/settings`, setting)
    .subscribe(
      resp => {  
        this.stepper.next();
      },
      errMsg => {
        console.log(errMsg)
      }
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }



}
