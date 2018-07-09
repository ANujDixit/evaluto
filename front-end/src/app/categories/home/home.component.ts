import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { UiService } from '../../common/ui.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  categories: Category[];
  categoryForm: FormGroup;
  private sub: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private router: Router,
              private uiService: UiService) { }

  ngOnInit() {
    this.getCategories();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  createForm(){
    this.categoryForm = this.fb.group({
      name: ['', Validators.required ],
    })
  }
  
  createCategory() {
    const category = { "category": this.categoryForm.value }  
    this.api.post('admin/categories', category)
      .subscribe(
        resp => {  
          this.uiService.showToast("Category Created Successfully", 'Close')
        },
        errMsg => {
          console.log(errMsg)
        }
      );
    
  }
  
  getCategories() {
    this.sub = this.api.get('admin/categories')
      .subscribe(
        resp => this.categories = resp as Category[],
        errMsg => console.log(errMsg) 
      );
  }
  
  resetForm() {
    this.categoryForm.reset();
  }

}
