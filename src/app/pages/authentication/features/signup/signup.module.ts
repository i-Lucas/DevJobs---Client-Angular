import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupRootComponent } from './container/signup-root.component';
import { SharedFormsModule } from '@app-shared-forms/shared-forms.module';
import { DeveloperSignupComponent } from './components/developer-signup/developer-signup.component';
import { CompanySignupComponent } from './components/company-signup/company-signup.component';

import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    SignupRootComponent,
    DeveloperSignupComponent,
    CompanySignupComponent
  ],
  imports: [
    CommonModule,
    SharedFormsModule,
    ReactiveFormsModule,

    InputTextModule,
    
    RouterModule.forChild([
      {
        path: '',
        component: SignupRootComponent,
        children: [
          {
            path: 'developer',
            component: DeveloperSignupComponent
          },
          {
            path: 'company',
            component: CompanySignupComponent
          },
          {
            path: '**',
            redirectTo: 'developer'
          }
        ]
      },
    ])
  ]
})
export default class SignupModule { }
