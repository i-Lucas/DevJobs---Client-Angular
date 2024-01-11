import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SignupRootComponent } from './container/signup-root.component';
import { SharedFormsModule } from '@app-shared-forms/shared-forms.module';
import { CompanySignupComponent } from './components/company-signup/company-signup.component';
import { DeveloperSignupComponent } from './components/developer-signup/developer-signup.component';

import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';

import { CommonSignupService } from './services/common-signup.service';

import { SharedModulesModule } from 'app/shared/modules/shared-modules.module';
import { StepButtonsComponent } from './components/step-buttons/step-buttons.component';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

import { PreviewJobComponent } from './components/form-preview/preview-job/preview-job.component';
import { OptionButtonsComponent } from './components/form-preview/option-buttons/option-buttons.component';
import { PreviewEducationComponent } from './components/form-preview/preview-education/preview-education.component';
import { PreviewCertificatesComponent } from './components/form-preview/preview-certificates/preview-certificates.component';
import { PreviewProjectsComponent } from './components/form-preview/preview-projects/preview-projects.component';
import { PreviewStacklistComponent } from './components/form-preview/preview-stacklist/preview-stacklist.component';
import { PreviewLanguagesComponent } from './components/form-preview/preview-languages/preview-languages.component';

const routes: Routes = [
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
]

@NgModule({
  declarations: [
    SignupRootComponent,
    DeveloperSignupComponent,
    CompanySignupComponent,
    StepButtonsComponent,
    
    PreviewEducationComponent,
    PreviewJobComponent,
    PreviewCertificatesComponent,
    OptionButtonsComponent,
    PreviewProjectsComponent,
    PreviewStacklistComponent,
    PreviewLanguagesComponent,
  ],
  providers: [
    CommonSignupService,
    DeveloperFormService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SharedFormsModule,
    SharedComponentsModule,
    SharedModulesModule,

    TagModule,
    ChipModule,
    ButtonModule,
    TabViewModule,
    InputTextModule,
    AccordionModule,

    RouterModule.forChild(routes)
  ]
})
export default class SignupModule { }
