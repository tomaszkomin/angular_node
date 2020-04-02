import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostModel } from './post.model';
import { Subject} from 'rxjs';
import { environment } from './../../environments/environment';
const API_URL = environment.api_url + '/posts/';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	private posts: PostModel[] = [];
	private postsUpdated$ = new Subject<PostModel[]>();

	constructor(
		private httpClient: HttpClient
	){}

	public getPosts(){
    this.httpClient.get<{ message:string, posts:any }>(API_URL)
      .pipe( map((response) => {
        return response.posts.map( (post) => {
          return {
            ...post,
            id: post._id
          }
        })
      }))
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated$.next([...this.posts])
      });
	}
	public addPost(post: PostModel){
    this.httpClient.post<{ message: string , postId: string}>(API_URL, post)
      .subscribe((response) => {
        console.log(response);
        const id = response.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated$.next([...this.posts])
      })
  }
	public getPostUpdateListener(){
    return this.postsUpdated$.asObservable();
	}
  public deletePost( postId : string ){

    this.httpClient.delete(API_URL + `${postId}`)
      .subscribe(() => {
        console.log( 'DELETED = ' + API_URL + postId )
        const updatedPosts = this.posts.filter((post) =>  post.id !== postId)
        this.posts = updatedPosts;
        this.postsUpdated$.next([...this.posts]);
      })

  }
}
