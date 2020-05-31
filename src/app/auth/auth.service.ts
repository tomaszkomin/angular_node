import { environment } from './../../environments/environment';
const API_URL = environment.api_url + '/user/';

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import { AuthDataInterface } from './auth.data.model';

@Injectable({providedIn: "root"})
export class AuthService{
	private token: string;
	private authStatus$ = new Subject<boolean>();
	private isAuth: boolean = false;
	private timerSub: any;
	private userId: string
	public username: string;
	public username$ = new ReplaySubject<string>();

	constructor(
		private httpClient: HttpClient,
		private router: Router
	){};
	public createUser(email :string , password: string){
		const authData: AuthDataInterface = {
			email: email,
			password: password
		};
		this.httpClient.post(API_URL + "signup", authData)
			.subscribe(()=>{
				this.authStatus$.next(true);
				this.router.navigate(["/"]);
			}, error =>{
				this.authStatus$.next(false);
			});
	}
	public login(email:string , password:string){
		const authData: AuthDataInterface = {
			email: email,
			password: password
		};
		this.httpClient
			.post<{token:string, userId:string, username:string, expiresIn:number}>(API_URL + "login", authData)
				.subscribe((result) => {
					this.token = result.token;
					if(this.token){
						const expiresIn = result.expiresIn;
						this.timerSub = setTimeout(() => {
							this.logOut();
						}, expiresIn * 1000)//epires in is s set timeout in ms
						this.userId = result.userId;
						this.username = result.username;
						this.isAuth = true;
						this.authStatus$.next(this.isAuth);
						this.username$.next(this.username);
						const now = new Date();
						const expirationDate = new Date(now.getTime() + expiresIn * 1000);
						this.setAuthLogin(this.token, expirationDate, this.userId,this.username);
						this.router.navigate(["/"]);
					}
				},(error)=>{
					this.authStatus$.next(false);
				});
	}
	public logOut(){
		this.token = null;
		this.isAuth = false;
		this.userId = null;
		this.authStatus$.next(false);
		this.username$.next('');
		clearTimeout(this.timerSub);
		this.clearAuthLogin();

		this.router.navigate(["/login"]);
	}
	public getAuthStatusListener(){
		return this.authStatus$.asObservable();
	}
	public getToken(){
		return this.token;
	}
	//@message returns authentication state
	public getIsAuth(){
		return this.isAuth;
	}
	public getUserId(){
		return this.userId;
	}
	public getUsername(){
		return this.username;
	}
	private getAuthLogin(){
		const token = localStorage.getItem('token');
		const expiresIn = new Date(localStorage.getItem('expiresIn'));
		const userId = localStorage.getItem('userId');
		this.username = localStorage.getItem('username');
		if(!token || !expiresIn){
			return;
		}
		return{
			token: token,
			expiresIn : expiresIn,
			userId: userId,
			username: this.username
		}
	}
	private setAuthLogin( token: string, expirationDate: Date, userId: string, username: string ){
		this.clearAuthLogin();
		localStorage.setItem('token', token);
		localStorage.setItem('expiresIn', expirationDate.toISOString());
		localStorage.setItem('userId', userId);
		localStorage.setItem('username',username);
	}
	private clearAuthLogin(){
		localStorage.removeItem('token');
		localStorage.removeItem('expiresIn');
		localStorage.removeItem('userId');
		localStorage.removeItem('username');
	}
	public AutoLogin(){
		const authLogin = this.getAuthLogin();
		if(authLogin){
			const now = new Date();
			const timeLeft = authLogin.expiresIn.getTime() - now.getTime();
			if (timeLeft > 0){
				this.token = authLogin.token;
				this.isAuth = true;
				this.userId = authLogin.userId;
				this.username = authLogin.username;
				this.username$.next(this.username);
				this.authStatus$.next(true);
				this.setAuthLogin(this.token, authLogin.expiresIn, this.userId, this.username);
			}
		}
	}
}
