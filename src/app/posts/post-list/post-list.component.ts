import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostModel } from './../post.model';
import { PostService } from './../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit, OnDestroy {
    public isLoading = false;
	public posts: PostModel[] = [];
	public totalSize: number;
	public pageSizeOptions:number[] = [50,150,100];
	public pageSize:number = this.pageSizeOptions[0];
	public currentPage:number;
	public userAuth:boolean = false;
	public userId:string;
	private subscription: Subscription;
	private authStatus$: Subscription;
    constructor(
		  private postsService: PostService,
		  private authService: AuthService
    ) {}
    ngOnInit(): void {
		this.isLoading = true;
		this.postsService.getPosts(this.pageSize,this.currentPage);
		this.userId = this.authService.getUserId();
		this.subscription = this.postsService
		.getPostUpdateListener()
        .subscribe((result : { posts: PostModel[] , postCount: number }) => {
			this.posts = result.posts;
			this.totalSize = result.postCount;
			this.isLoading = false;
		});
		this.userAuth = this.authService.getIsAuth();
		this.authStatus$ = this.authService
			.getAuthStatusListener()
			.subscribe((isAuthenticated) => {
				this.userAuth = isAuthenticated;
				this.userId = this.authService.getUserId();
			});
    }
    ngOnDestroy(): void {
	  this.subscription.unsubscribe();
	  this.authStatus$.unsubscribe();
    }
    public onDelete( id: string ) {
		this.isLoading = true;
      	this.postsService.deletePost(id).subscribe( (result) =>{
			  this.postsService.getPosts(this.pageSize , this.currentPage);
	   	})
	}
	public onChangePage(changedPage: PageEvent){
		this.isLoading = true;
		this.currentPage = changedPage.pageIndex + 1;
		this.pageSize = changedPage.pageSize;
		this.postsService.getPosts(this.pageSize, this.currentPage);
	}
}
