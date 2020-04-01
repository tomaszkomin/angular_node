import { Component, EventEmitter , Output} from '@angular/core';
import { PostModel } from './../post.model'
import { NgForm } from '@angular/forms';
import { PostService } from './../post.service';
@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls : [ './post-create.component.sass']
})
  export class PostCreateComponent {

  public enteredContent:string  = '';
  public enteredTitle = '';
  public error = '';

  constructor(
      private postsService: PostService
  ){};
  public onAddPost(postInputForm: NgForm) {
    console.log(postInputForm);
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

    //this.postCreated.emit(post);
  }
}
