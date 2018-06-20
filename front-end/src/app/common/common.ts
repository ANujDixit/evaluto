import	{ HttpErrorResponse	}	from	'@angular/common/http' 
import	{	throwError }	from	'rxjs'

export	function	transformError(error:	HttpErrorResponse	|	string)	{		
  let	errorMessage	=	'An	unknown	error	has	occurred'		
  if	(typeof	error	===	'string')	{				
    errorMessage	=	error		
  }	else	if	(error.error	instanceof ErrorEvent)	{				
    errorMessage	=	`Error!	${error.error.message}`		
  }	else	if	(error.status)	{		
    errorMessage	=	`Request	failed	with	${error.status}	${error.statusText} ${error.error}`	
  }		
  return	throwError(errorMessage) 
}  

export function transformHttpError(errorResponse) {
  let errors = { statusCode: null , errors: "Something bad happened; please try again later." } 
  if (errorResponse instanceof HttpErrorResponse) {
      const statusCode = errorResponse.status;
      if (errorResponse.error) {
        errors = { statusCode: statusCode, errors: errorResponse.error.errors }  
      }
  } else {
      errors = errorResponse.message ? errorResponse.message : errorResponse.toString();
  }
  return 	throwError(errors)
}