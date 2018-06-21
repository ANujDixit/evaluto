import {	Validators	}	from	'@angular/forms'
import { MatchPasswordValidation } from	'./async-validations';

export const OptionalTextValidation = [ Validators.minLength(2), Validators.maxLength(50) ]
export const RequiredTextValidation = OptionalTextValidation.concat([ Validators.required ])
export const EmailValidation	=	[ Validators.required,	Validators.email ] 
export const PasswordValidation	=	[ Validators.required, Validators.minLength(8), Validators.maxLength(50) ]
export const PasswordConfirmationValidation	=	[ Validators.required, Validators.minLength(8), Validators.maxLength(50), MatchPasswordValidation() ]
export const TenantCodeValidation = [ Validators.required ]
export const TenantNameValidation = [ Validators.required ]
export const FirstNameValidation = [ Validators.required ]
export const LastNameValidation = [ Validators.required ]



