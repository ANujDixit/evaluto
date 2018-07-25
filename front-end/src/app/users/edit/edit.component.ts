import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { ApiService } from '../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from '../../common/ui.service';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: any;
  private sub: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private api: ApiService, 
              private router: Router,
              private route: ActivatedRoute,
              private uiService: UiService) { }

  ngOnInit() {
    this.createForm();
    this.getUser();    
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getUser(){
    this.sub = this.route.params.pipe(
      map(params => params['userId']),
      switchMap(id => this.api.get(`admin/users/${id}`))
    ).subscribe(
        resp => {
          this.user = resp;       
          this.setForm(this.user);
        },  
        errMsg => console.log(errMsg) 
    )
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

  edit() {
    const user = { "user": this.form.value }  
    this.api.put(`admin/users/${this.user.id}`, user)
      .subscribe(resp => {     
        this.uiService.showToast("User Edited Successfully", 'Close')
        this.router.navigate(['/admin/uam/users/list']);
      }, err => {                
        console.log(err)       
    });
  } 

}
