import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostModel } from './post.model';
import { Subject} from 'rxjs';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
const API_URL = environment.api_url + '/posts/';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	private posts: PostModel[] = [];
	private postsUpdated$ = new Subject<{ posts:PostModel[] , postCount:number }>();

	constructor(
	private httpClient: HttpClient,
	private router: Router
	) {}

	public getPosts( pageSize:number , currentPage:number  ) {
		const queryParams = `?pageSize=${pageSize}&page=${currentPage}`;
		this.httpClient.get<{ message: string, posts: any , postCount:number }>(API_URL + queryParams)
			.pipe(
				map( response => {
					return {
						posts : response.posts.map( (post) => {
							return {
								...post,
								id: post._id
							}}
						),
						postCount: response.postCount
					}
				})
			)
			.subscribe((postsTransformedResponse) => {
				this.posts = postsTransformedResponse.posts;
				this.postsUpdated$.next({posts: [...this.posts] , postCount: postsTransformedResponse.postCount});
			});
	}
	public getPostUpdateListener() {
		return this.postsUpdated$.asObservable();
	}
	public addPost(post: PostModel) {
		const postData = new FormData();	//allows sendingBLOB

		postData.append("title", post.title);
		postData.append("content", post.content);
		postData.append("image", post.imageUrl, post.title);
		console.log(postData);
		//this.httpClient.post<{ message: string , post : PostModel}>(
		this.httpClient.post<{message: string , post: PostModel}>(
			API_URL,
			postData
		)
		.subscribe((response) => {
			const post: PostModel = {
				id: response.post.id,
				title: response.post.title,
				content: response.post.content,
				imageUrl : response.post.imageUrl
			}
			this.posts.push(post);
			this.postsUpdated$.next([...this.posts]);
			this.router.navigate(['/']);
		});
	}
	public updatePost(post: PostModel) {
		const id = post.id;
		// let postData : PostModel | FormData;
		let postData : any;

		if( typeof(post.imageUrl) === "object"){
			postData = new FormData();
			postData.append("id", post.id);
			postData.append("title", post.title);
			postData.append("content", post.content);
			postData.append("image", post.imageUrl,post.title);
		} else {
			postData  = {
				id: id,
				title: post.title,
				content: post.content,
				imageUrl : post.imageUrl
			}
		}

		this.httpClient
			.put(API_URL + id , postData )
			.subscribe((result) => {
				const updatedPosts = [...this.posts];
				const updatedIndex = updatedPosts.findIndex( updatedPost => updatedPost.id === id);
				console.log(postData)
				const post: PostModel = {
					id : postData.id,
					title : postData.title,
					content : postData.content,
					imageUrl : postData.imageUrl
				}
				updatedPosts[updatedIndex] = post;
				this.posts = updatedPosts;
				this.postsUpdated$.next({posts: [...this.posts] , postCount: 1346});
				this.router.navigate(['/']);
			});
	}
	public deletePost(postId: string ) {
		return this.httpClient.delete(API_URL + `${postId}`)
	}
	public getPost(id: string) {
		return this.httpClient.get(API_URL + id);
	}
}
