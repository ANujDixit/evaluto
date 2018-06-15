import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidation, PasswordValidation, TenantCodeValidation	}	from	'../common/validations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { AuthService } from '../auth/auth.service';
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
    //private authService: AuthService,
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
	  const signin = { "signin": submittedForm.value}  
    // this.api.post('signin', signin)
    //   .subscribe(authStatus => {
    //     if (authStatus.isAuthenticated) {
    //       this.uiService.showToast(`Welcome! Role: ${authStatus.userRole}`)
    //       this.router.navigate([
    //         this.redirectUrl || this.homeRoutePerRole(authStatus.userRole),
    //       ])
    //     }
    //   }, error => (this.loginError = error))
  }

  homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Admin:
        return '/admin'
      default:
        return '/user/profile'
    }
  }

}
