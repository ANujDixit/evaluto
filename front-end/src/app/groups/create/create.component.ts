import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private api: ApiService, 
              public dialogRef: MatDialogRef<CreateComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  save(){
    
  }
  
  close(){
    
  }

}
