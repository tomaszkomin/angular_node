import { environment } from './../../environments/environment';
const API_URL = environment.api_url + '/posts/';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { PostModel } from './post.model';
import { Router } from '@angular/router';

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
		return this.httpClient.get<{ message: string, posts: any , postCount:number }>(API_URL + queryParams)
			.pipe(
				map( response => {
					return {
						posts : response.posts.map((post) => {
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
		const postData = new FormData();//allows sendingBLOB
		postData.append("title", post.title);
		postData.append("content", post.content);
		postData.append("image", post.imageUrl, post.title);
		return this.httpClient.post<{message: string , post: PostModel}>(
			API_URL,
			postData
		)
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
		}
		else {
			postData  = {
				id: id,
				title: post.title,
				content: post.content,
				imageUrl : post.imageUrl,
				createdBy: null //filled on server side
			}
		}

		return this.httpClient.put(API_URL + id , postData );
	}
	public deletePost(postId: string ) {
		return this.httpClient.delete(API_URL + `${postId}`)
	}
	public getPost(id: string) {
		return this.httpClient.get(API_URL + id);
	}
}
