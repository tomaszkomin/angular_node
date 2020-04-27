import { Component, OnInit } from '@angular/core';
import { PostModel } from './posts/post.model';
import { AuthService } from './auth/auth.service';
@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  public title = 'mean-course';
  public providerPosts = [];
	constructor( private authService:AuthService){

	}
	public ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		this.authService.AutoLogin()
	}
	public onPostAdded( post: PostModel ) {
		console.log(post);
		this.providerPosts.push(post);
	}
}
