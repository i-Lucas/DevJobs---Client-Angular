import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SigninRootComponent } from './container/signin-root.component';

@NgModule({
  declarations: [
    SigninRootComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SigninRootComponent
      }
    ])
  ]
})
export default class SigninModule { }
