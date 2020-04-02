import { Component, EventEmitter , Output, OnInit} from '@angular/core';
import { PostModel } from './../post.model'
import { NgForm } from '@angular/forms';
import { PostService } from './../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls : [ './post-create.component.sass']
})
export class PostCreateComponent implements OnInit {

  public enteredContent:string  = '';
  public enteredTitle = '';
  public error = '';

  private mode = "create"; //create or edit
  private postId: string;

  constructor(
      private postsService: PostService,
      public  activatedRoute: ActivatedRoute
  ){};

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(( paramMap:ParamMap) => {
      if( paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
      }
      else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  public onAddPost(postInputForm: NgForm): void {
    if(!postInputForm.valid){
      this.error = "Form invalid"
      console.log('form invalid');
      return;
    }
    const post: PostModel = {
      title: postInputForm.value.title,
      content : postInputForm.value.content
    }
    this.postsService.addPost(post);
    postInputForm.resetForm();
  }
}
