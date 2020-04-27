import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
	constructor(private authService: AuthService){}

	intercept(req: HttpRequest<any>, next: HttpHandler):Observable<any>{
		console.log("interceptor");
		const authToken = this.authService.getToken();
		const authRequest = req.clone({
			headers: req.headers.set('Authorization', "Bearer"+ " " + authToken)
		})
		console.log(authRequest);
		return next.handle(authRequest);
	}
}