import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
	LoginComponent,
    SignupComponent
  ],
  imports: [
	CommonModule,
	AuthRoutingModule,
	MaterialModule,
	FormsModule,
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule{ }
