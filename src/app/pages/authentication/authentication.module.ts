import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthRootComponent } from './container/auth-root.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';

import { ProgressBarModule } from 'primeng/progressbar';

const routes: Routes = [
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
];

@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthRootComponent
  ],
  imports: [
    CommonModule,
    ProgressBarModule,
    RouterModule.forChild(routes)
  ]
})
export default class AuthenticationModule { }
