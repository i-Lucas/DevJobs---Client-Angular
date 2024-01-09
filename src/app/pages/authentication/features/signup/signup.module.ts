import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRootComponent } from './container/signup-root.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SignupRootComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignupRootComponent
      }
    ])
  ]
})
export default class SignupModule { }
