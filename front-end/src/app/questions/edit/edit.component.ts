import { Component, OnInit, OnDestroy, OnChanges  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UiService } from '../../common/ui.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  questionForm: FormGroup;
  choices: FormArray;
  question: any;
  private sub: Subscription = new Subscription();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private api: ApiService,
              private uiService: UiService) {
    this.createForm();           
  }

  ngOnInit() {
    this.getQuestion();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  createForm() {
    this.questionForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      explanation: [''],
      choices: this.fb.array([])
    });
  }

  ngOnChanges() {
    this.setForm();
  }

  getQuestion(){
    this.sub = this.route.params.pipe(
      map(params => params['questionId']),
      switchMap(id => this.api.get(`admin/questions/${id}`))
    ).subscribe(
        resp => {
          this.question = resp;       
          this.setForm()
        },  
        errMsg => console.log(errMsg) 
    )
  }

  setForm(){
    this.questionForm.reset({
      id: this.question.id,
      title: this.question.title,
      type: this.question.type,
      explanation: this.question.explanation
    });

    this.setChoices(this.question.choices);
  }

  setChoices(choices: any[]) {
    let control = this.fb.array([]);  
    choices.forEach(x => {
      control.push(this.fb.group({
        id: x.id,
        title: x.title,
        correct: x.correct,
        seq: x.seq,
        delete: false}))
    })
    this.questionForm.setControl('choices', control);
  }

  get choiceForms(){
    return <FormArray>this.questionForm.get('choices')['controls']
                      .filter((element) =>  element.value.delete === false)  
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

  deleteChoiceByIndex(i: number): void {
   this.choiceForms.removeAt(i)
  }

  deleteChoiceById(id: string): void {    
    let index = this.questionForm.controls['choices']['controls']
                      .findIndex(x => x.value.id === id);
    this.questionForm.value.choices[index].delete = true ; 
  }

  edit() {
    const question = { "question": this.questionForm.value }  
    this.api.put(`admin/questions/${this.question.id}`, question)
      .subscribe(
        resp => {  
          this.uiService.showToast("Question Edited Successfully", 'Close')
          this.router.navigate([`/admin/quiz/questions/${resp.id}`]);
        },
        errMsg => {
          console.log(errMsg)
        }
      );
  }

}
