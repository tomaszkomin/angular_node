import { Component, EventEmitter , Output, OnInit} from '@angular/core';
import { PostModel } from './../post.model'
import { NgForm } from '@angular/forms';
import { PostService } from './../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls : [ './post-create.component.sass']
})
export class PostCreateComponent implements OnInit {

  public error = '';
  public  post: PostModel;

  private mode = "create"; //create or edit
  private postId: string;

  constructor(
      private postsService: PostService,
      public  activatedRoute: ActivatedRoute,
      public  router: Router
  ){};

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (paramMap:ParamMap) => {
      if( paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe( (res: {message:string , post: {_id:string , title:  string , content : string}}) => {
          const postFromDB = res.post;
          this.post = { id: postFromDB._id , title: postFromDB.title , content : postFromDB.content}
        });
      }
      else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  public onSavePost(postInputForm: NgForm): void {
    if(postInputForm.invalid){
      this.error = "Form invalid post.create.44"
      return;
    }
    const post = {
      title: postInputForm.value.title,
      content : postInputForm.value.content
    }
    console.log(post);
    if (this.mode === 'create'){
      this.postsService.addPost(post);
    }
    else{
      this.postsService.updatePost({...post, id:this.postId});
    }
    postInputForm.resetForm();
    this.router.navigate(['/']);
  }
}
