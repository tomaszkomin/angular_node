import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, Observer } from 'rxjs';
import { MatButton} from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy{
	public userAuth = false;
	public username:string;
	private authListemerSubs: Subscription;

	constructor(public authService: AuthService) {}
	ngOnInit(): void {

		this.userAuth = this.authService.getIsAuth()
		this.authListemerSubs = this.authService.getAuthStatusListener()
			.subscribe(isAuth => {
				this.userAuth = isAuth;
			})

	}
	ngOnDestroy(): void {

	}
	onLogOut(): void{
		this.authService.logOut();
	}
}
