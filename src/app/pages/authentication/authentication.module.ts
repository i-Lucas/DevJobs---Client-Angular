import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthRootComponent } from './container/auth-root.component';

import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthRootComponent
  ],
  imports: [
    CommonModule,

    ProgressBarModule,

    RouterModule.forChild([
      {
        path: '',
        component: AuthRootComponent,
        children: [
          {
            path: 'signin',
            loadChildren: () => import('./features/signin/signin.module')
          },
          {
            path: 'signup',
            loadChildren: () => import('./features/signup/signup.module')
          },
          {
            path: '**',
            redirectTo: 'signin'
          }
        ]
      }
    ])
  ]
})
export default class AuthenticationModule { }
