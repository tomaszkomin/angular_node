import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {
	public isLoading = false;
	public error;
	private authService$:Subscription;
	constructor(
		public authService:AuthService,
		private router:Router
	){}

	ngOnInit(): void {
		this.authService$ = this.authService.getAuthStatusListener()
		.subscribe( authStatus => {
			console.log(authStatus);
			this.isLoading = false;
		});
	}
	public onSignUp(form: NgForm){
		if(form.invalid) return;
		this.isLoading = true;
		this.authService.createUser(form.value.email, form.value.password);
		// .subscribe((result) => {
		// 		console.log("AUTH SIGNUP POST SEND");
		// 		this.router.navigate(["/"]);
		// 	},
		// 	error => {
		// 		console.log(error);
		// 		this.error = error;
		// 		this.isLoading = false;
		// 	});
	}
	ngOnDestroy(): void{
		this.authService$.unsubscribe();
		this.isLoading = false;
	}
}
