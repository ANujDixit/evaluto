import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoadingService } from '../../core/services/loading.service';
import { Subscription } from 'rxjs';
import { UiService } from '../../common/ui.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  
  questionForm: FormGroup;
  choices: FormArray;
  questionType: number;
  private sub: Subscription = new Subscription();
  
  categories: any[] = [
    {value: 'steak-0', viewValue: 'Programming'},
    {value: 'pizza-1', viewValue: 'Databases'},
    {value: 'tacos-2', viewValue: 'Operating Systems'}
  ];

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private router: Router,
              private loadingService: LoadingService,
              private route: ActivatedRoute,
              private uiService: UiService) { }

  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe(params => {
        //this.questionType = +params['type'];
        this.questionType = 1;
        this.createForm();
      });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  createForm(){
    this.questionForm = this.fb.group({
      title: ['', Validators.required ],
      type: this.questionType,
      choices: this.fb.array([this.createChoice(1), this.createChoice(2), this.createChoice(3), this.createChoice(4)]),
      explanation: '',
      tags: []
    })
  }
  
  get choiceForms(){
    return this.questionForm.get('choices') as FormArray
  }
  
  createChoice(seq: number): FormGroup {
    return this.fb.group({
      title: '',
      correct: false,
      seq: seq
    });
  }
  
  addChoice(): void {
    const choice = this.fb.group({
      title: '',
      correct: false,
      seq: this.choiceForms.length
    })
 
    this.choiceForms.push(choice);
  }

  deleteChoice(i: number): void {
   this.choiceForms.removeAt(i)
  }
  
  create() {
    const question = { "question": this.questionForm.value }  
    this.api.post('admin/questions', question)
      .subscribe(
        resp => {  
          this.uiService.showToast("Question Created Successfully", 'Close')
        },
        errMsg => {
          console.log(errMsg)
        }
      );
  }
  
  addTag(){
    
  }

}
