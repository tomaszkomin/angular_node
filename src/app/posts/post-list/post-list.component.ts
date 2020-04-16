import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from './../post.model';
import { PostService } from './../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {
    public isLoading = false;
	public posts: PostModel[] = [];
	public totalSize: number;
	public pageSizeOptions:number[] = [3,4,10,20];
	public pageSize:number = this.pageSizeOptions[0];
	public currentPage:number;
	private subscription: Subscription;

    constructor(
      	private postsService: PostService
    ) {}
    ngOnInit(): void {
		console.log("NG ON INIT POST LIST COMPONENT");
		this.isLoading = true;
		this.postsService.getPosts(this.pageSize,this.currentPage);
		this.subscription = this.postsService.getPostUpdateListener()
        .subscribe((result : { posts: PostModel[] , postCount: number }) => {
			this.posts = result.posts;
			this.totalSize = result.postCount;
			this.isLoading = false;
        });
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    public onDelete( id: string ) {
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
