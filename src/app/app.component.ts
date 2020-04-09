import { Component } from '@angular/core';
import { PostModel } from './posts/post.model';
@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public title = 'mean-course';
  public providerPosts = [];

  public onPostAdded( post: PostModel ) {
    console.log(post);
    this.providerPosts.push(post);
  }
}
