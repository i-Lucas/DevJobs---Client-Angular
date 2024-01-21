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
  imports: [
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
  ]
})
export class PrimeModule { }

@NgModule({
  declarations: [
    SigninRootComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    PrimeModule,
    SharedFormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SigninRootComponent
      }
    ])
  ]
})
export default class SigninModule { }
