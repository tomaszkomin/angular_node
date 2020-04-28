import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
	constructor( private dialog:MatDialog ){}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
		return next.handle(req).pipe(
			catchError((errorRes : HttpErrorResponse) => {
				console.log(errorRes);
				console.log(errorRes.error);
				console.log(errorRes.error.message);
				let errorMessage = "an unknown error ocurred!"
				if(errorRes.error.message){
					errorMessage = errorRes.error.message;
				}
				this.dialog.open(ErrorComponent,{ data: {message : errorMessage}}) ;
				console.log("AFTER MAT DIALOG COMPOINTETNTE CALL");
				return throwError(errorRes)
			})
		)
	}
}
