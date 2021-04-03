import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '../../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../core/material/material.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
