import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from './../post.model';
import { PostService } from './../post.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

    public posts: PostModel[] = [];
    private subscription: Subscription;
    constructor(
      private postsService: PostService
    ) {};
    ngOnInit(): void {
      this.postsService.getPosts();
      this.subscription = this.postsService.getPostUpdateListener()
        .subscribe((posts: PostModel[]) => this.posts = posts );
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    onDelete( id: string ){
      this.postsService.deletePost(id);
    }
}
