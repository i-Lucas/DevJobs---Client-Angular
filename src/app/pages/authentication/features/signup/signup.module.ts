import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupRootComponent } from './container/signup-root.component';
import { SharedFormsModule } from '@app-shared-forms/shared-forms.module';
import { CompanySignupComponent } from './components/company-signup/company-signup.component';
import { DeveloperSignupComponent } from './components/developer-signup/developer-signup.component';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { StepButtonsComponent } from './components/step-buttons/step-buttons.component';

@NgModule({
  declarations: [
    SignupRootComponent,
    DeveloperSignupComponent,
    CompanySignupComponent,
    StepButtonsComponent
  ],

  imports: [
    CommonModule,
    SharedFormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,

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
