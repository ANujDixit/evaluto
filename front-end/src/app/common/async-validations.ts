import { AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';
import { Observable, pipe , timer} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export function ExistingTenantCodeValidation(api): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 500; 
    return timer(debounceTime)
    .pipe(
      switchMap(()=> {
        return api.get('tenants', {"tenant_code": control.value})
                      .pipe(
                          map((tenants) => {
                            return (tenants && (Object.keys(tenants).length === 0)) ? null : {"tenantCodeExists": true};
                            })
                          );
                  
      })
    );  
  };
}

export function ExistingTenantNameValidation(api): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 500; 
    return timer(debounceTime)
    .pipe(
      switchMap(()=> {
        return api.get('tenants', {"tenant_name": control.value})
                   .pipe(
                      map((tenants) => {
                          return ((tenants) && (Object.keys(tenants).length === 0)) ? null : {"tenantNameExists": true}; 
                          })
                        );
      }) 
    );  
  };
}

export function MatchPasswordValidation(): ValidatorFn {
  return (rpw: AbstractControl): {[key: string]: any} => {
    const fg = rpw.parent;
    if (fg) {
      const pw = fg.get('password');
      return pw.value !== rpw.value ? {'no-match': {value: rpw.value}} : null;
    }
    return null;
  };
}