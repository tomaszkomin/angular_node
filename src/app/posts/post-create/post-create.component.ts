import { Component, OnInit} from '@angular/core';
import { PostModel } from './../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { imageMimeType } from './image-mime-validator';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls : [ './post-create.component.sass']
})
export class PostCreateComponent implements OnInit {
  public error = '';
  public isLoading = false;
  public post: PostModel;
  public form: FormGroup;
  public imageUrlEncoded: string | ArrayBuffer;

  public mode = 'create'; // create or edit
  private postId: string;

  constructor(
      private postsService: PostService,
      public  activatedRoute: ActivatedRoute,
      public  router: Router
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
		title: new FormControl(null, {
			validators: [Validators.required, Validators.minLength(3)]
		}),
		content: new FormControl(null, {
			validators: [Validators.required]
		}),
		image: new FormControl(null , {
			validators: [Validators.required]
			// ,asyncValidators : [imageMimeType]
		})
    });

    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe( (res: {message: string , post: {_id: string , title: string , content: string, imageUrl:any, createdBy:string}}) => {
          this.isLoading = false;
          const postFromDB = res.post;
          this.post = {
             id: postFromDB._id ,
             title: postFromDB.title ,
			 content : postFromDB.content,
			 imageUrl : postFromDB.imageUrl,
			 createdBy: postFromDB.createdBy
          };
          this.form.setValue({
            title: this.post.title,
			content : this.post.content,
			image : this.post.imageUrl
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  public onSavePost(): void {
    if (this.form.invalid) {
      this.error = 'Form invalid post.create.44';
      return;
    }
    this.isLoading = true;
    const post = {
		title: this.form.value.title,
		content : this.form.value.content,
		imageUrl : this.form.value.image,
		createdBy: null //filled by server side
    };
    if (this.mode === 'create') {
	   this.postsService.addPost(post).subscribe((response) => {
			this.reloadForm();
	   });
    } else {
	   this.postsService.updatePost({...post, id: this.postId}).subscribe((result) => {
			this.reloadForm();
	   });
    }
  }
  private reloadForm(){
	this.form.reset();
	this.isLoading = false;
   	this.router.navigate(['/']);
  }
  public onImageSet(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();

    this.form.patchValue({image : file});
    this.form.get('image').updateValueAndValidity();
    fileReader.onload = () => {
      this.imageUrlEncoded = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }
}
