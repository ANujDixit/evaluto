import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidation, PasswordValidation, TenantCodeValidation	}	from	'../common/validations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/role.enum';
import { UiService } from '../common/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loginError = ''
  redirectUrl

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) { 
    route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')))
  }

  ngOnInit() {
    this.buildLoginForm();
  }
  
  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      tenantCode: ['', TenantCodeValidation],
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }
  
	async login(submittedForm: FormGroup) {
	  this.authService
      .login(submittedForm.value.tenantCode, submittedForm.value.email, submittedForm.value.password)
      .subscribe(
        (authStatus) => {
          if (authStatus.isAuthenticated) {
            this.uiService.showToast(`Welcome! Role: ${authStatus.userRole}`, 'Close')
            this.router.navigate([
              this.redirectUrl || this.homeRoutePerRole(authStatus.userRole),
            ])
          }
        }, 
        (errMsg) => {
          this.loginError = errMsg;
          this.uiService.showToast(`Error: ${errMsg}`, 'Close', {
              duration: 40000,
              panelClass: "error-dialog",
          });
        }
      )
  }

  homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Admin:
        return '/admin'
      case Role.Owner:
        return '/admin'  
      default:
        return '/user/profile'
    }
  }

}
