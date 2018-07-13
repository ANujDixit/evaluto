import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from '../../shared/models/group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  form: FormGroup;
  private sub: Subscription = new Subscription();
  
  constructor(private fb: FormBuilder,
              private api: ApiService, 
              public dialogRef: MatDialogRef<CreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    if (!(Object.keys(this.data).length === 0 && this.data.constructor === Object)) {
      this.setForm(this.data);
    } 
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  
  createForm(){
    this.form = this.fb.group({
      id: '',
      name: ['', Validators.required],
    })
  }
  
  setForm(group: Group){
    this.form.reset({
      id: group.id,
      name: group.name
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  create_or_edit() {
    (Object.keys(this.data).length === 0 && this.data.constructor === Object) ?  this.create() :  this.edit();
  }
  
  create(){
    const group = { "group": this.form.value }  
    this.api.post('admin/groups', group)
      .subscribe(
        resp => {  
          this.dialogRef.close("saved");
        },
        errMsg => {
          console.log(errMsg)
        }
      );
  }
  
  edit() {
    const group = { "group": this.form.value }  
    this.api.put(`admin/groups/${this.data.id}`, group)
      .subscribe(resp => {        
        this.dialogRef.close("edited");
      }, err => {                
        console.log(err)       
    });
  }
  
  close(){
    this.dialogRef.close();
  }

}
