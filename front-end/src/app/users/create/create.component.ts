import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from '../../common/ui.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private api: ApiService, 
              private router: Router,
              private uiService: UiService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      id: '',
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: 'participant'
    })
  } 

  create(){
    const user = { "user": this.form.value }  
    this.api.post('admin/users', user)
      .subscribe(
        resp => {        
          this.uiService.showToast("User Created Successfully", 'Close')
          this.router.navigate(['/admin/uam/users/list']);
        },
        errMsg => {
          console.log(errMsg)
        }
      );
  }

}
