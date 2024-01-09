import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SigninRootComponent } from './container/signin-root.component';
import { SharedFormsModule } from '@app-shared-forms/shared-forms.module';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    SigninRootComponent
  ],
  imports: [
    CommonModule,
    SharedFormsModule,
    ReactiveFormsModule,

    ButtonModule,
    
    RouterModule.forChild([
      {
        path: '',
        component: SigninRootComponent
      }
    ])
  ]
})
export default class SigninModule { }
