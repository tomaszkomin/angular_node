import { Component } from '@angular/core';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create'
})
export class PostCreateComponent{
  public newPost:string = 'NO CONTENT';
  public enteredValue: string;//from double binding

  public onAddPost(postInput: HTMLTextAreaElement){
    console.log(postInput)
    this.newPost = this.enteredValue;
  }
}
