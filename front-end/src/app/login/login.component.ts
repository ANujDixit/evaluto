import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidation, PasswordValidation, TenantCodeValidation	}	from	'../common/validations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { CacheService } from '../core/services/cache.service';
import { Role } from '../shared/enums/role.enum';
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
    private api: ApiService,
    private cache: CacheService,
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
      tenant_code: ['', TenantCodeValidation],
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }
  
	async login(submittedForm: FormGroup) {
	  
	 const signin = { "signin": submittedForm.value }  
    
    this.api.post('signin', signin)
      .subscribe(
        resp => {  
          this.uiService.showToast("You have successfully loggedin", 'Close')
          this.cache.setToken(resp.jwt)
          console.log(this.cache.getDecodedToken())
          this.router.navigate([this.homeRoutePerRole(this.cache.getDecodedToken().userRole)])
        },
        errMsg => {
          this.loginError = errMsg;
          this.uiService.showToast(`Error: ${errMsg}`, 'Close', { duration: 40000, panelClass: "error-dialog"});
        }
      );
	  
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
