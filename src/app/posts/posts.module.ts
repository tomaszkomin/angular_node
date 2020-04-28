import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
	PostCreateComponent,
    PostListComponent
  ],
  imports: [
	CommonModule,
	MaterialModule,
	ReactiveFormsModule,
	FormsModule,
	RouterModule
  ],
  exports: [
	  PostCreateComponent,
	  PostListComponent
  ]
})
export class PostsModule { }
