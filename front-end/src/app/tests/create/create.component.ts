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

  constructor(private fb: FormBuilder,
              private api: ApiService ) { }

  ngOnInit() {
    this.fetchData();
    this.testFormGroup = this.fb.group({
      name: ['', Validators.required],
      category: '',
      duration: '',  
      total_questions: '',
      total_marks: '',
      template: '',
      instruction: ''  
    });

    this.sectionFormGroup = this.fb.group({     
      sections: this.fb.array([ this.createSection(1), this.createSection(2), this.createSection(3)])
    });    

    this.settingFormGroup = this.fb.group({
      group_questions_section_wise: ['1', Validators.required],
      sections_shuffle: ['0', Validators.required],
      questions_shuffle: ['0', Validators.required],
      options_shuffle: ['0', Validators.required]
    });
     this.thirdFormGroup = this.fb.group({
      thirdCtrl: ['', Validators.required]
    });
    this.forthFormGroup = this.fb.group({
      forthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this.fb.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  createSection(seq: number): FormGroup {
    return this.fb.group({
      name: '',
      seq: seq
    });
  }

  get sectionForms() { 
    return this.sectionFormGroup.get('sections') as FormArray;
  }

  addSections(): void {
    this.sections = this.sectionFormGroup.get('sections') as FormArray;
    this.sections.push(this.createSection(this.sectionForms.length));
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
