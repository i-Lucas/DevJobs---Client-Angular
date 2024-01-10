import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SigninRootComponent } from './container/signin-root.component';
import { SharedFormsModule } from '@app-shared-forms/shared-forms.module';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    SigninRootComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedFormsModule,
    ReactiveFormsModule,

    ButtonModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
    
    RouterModule.forChild([
      {
        path: '',
        component: SigninRootComponent
      }
    ])
  ]
})
export default class SigninModule { }
