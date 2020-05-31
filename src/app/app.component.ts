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
		this.authService.AutoLogin()
	}
	public onPostAdded( post: PostModel ) {
		this.providerPosts.push(post);
	}
}
