import { CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{
	constructor(
		private authService:AuthService,
		private router:Router
	){}

	canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		const isAuth = this.authService.getIsAuth();
		if(isAuth){
			return true;
		}
		else{
			this.router.navigate(['/login'])
			return false;
		}
	}
}
