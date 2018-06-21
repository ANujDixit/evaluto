import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidation, TenantCodeValidation, PasswordValidation, PasswordConfirmationValidation, FirstNameValidation, LastNameValidation	}	from	'../common/validations';
import { ExistingTenantNameValidation } from	'../common/async-validations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api/api.service';
import { UiService } from '../common/ui.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  signUpError = '';
  password_hide: Boolean = true;
  confirm_password_hide: Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.buildSignUpForm();
  }
  
  buildSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      tenant_name: ['', TenantCodeValidation, [ExistingTenantNameValidation(this.apiService)] ],
      email: ['', EmailValidation],
      first_name: ['', FirstNameValidation],
      last_name: ['', FirstNameValidation],
      password: ['', PasswordValidation],
      password_confirmation: ['', PasswordConfirmationValidation]
    })
  }
  
  fcErr(fc: string, ec: string, pre?: string[]): boolean {
    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.signUpForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.signUpForm.get(fc).hasError(ec);
  }

}
