import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private sub: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
    private api: ApiService, 
    private router: Router,
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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      role: 'participant'
    })
  }
  
  setForm(user: User){
    this.form.reset({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      role: user.role
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  create_or_edit() {
    (Object.keys(this.data).length === 0 && this.data.constructor === Object) ?  this.create() :  this.edit();
  }
  
  create(){
    const user = { "user": this.form.value }  
    this.api.post('admin/users', user)
      .subscribe(
        resp => {  
          this.dialogRef.close("saved");
          this.router.navigate(['/admin/uam/users/list']);
        },
        errMsg => {
          console.log(errMsg)
        }
      );
  }
  
  edit() {
    const user = { "user": this.form.value }  
    this.api.put(`admin/users/${this.data.id}`, user)
      .subscribe(resp => {        
        this.dialogRef.close("edited");
        this.router.navigate(['/admin/uam/users/list']);
      }, err => {                
        console.log(err)       
    });
  }
  
  close(){
    this.dialogRef.close();
  }


}
