import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

	public isLoading = false;
	public error: string;
	private authService$: Subscription;
	constructor(
		public authService: AuthService,
		private router: Router
	){}
	ngOnInit(): void {
		this.authService$ = this.authService.getAuthStatusListener()
		.subscribe( authStatus => {
			this.isLoading = false;
		});
	}
	public onLogin(form:NgForm): void{
		this.isLoading = true;
		this.authService.login(form.value.email,form.value.password);
	}
	ngOnDestroy(): void {
		this.authService$.unsubscribe();
	}
}
