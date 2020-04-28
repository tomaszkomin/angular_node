import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostService } from './posts/post.service';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
	AuthModule,
	AppRoutingModule,
	MaterialModule,
	PostsModule
  ],
  providers: [
	PostService,{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	},{
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorInterceptor,
		multi: true
	}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
