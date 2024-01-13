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
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { CommonSignupService } from './services/common-signup.service';

import { SharedModulesModule } from 'app/shared/modules/shared-modules.module';
import { StepButtonsComponent } from './components/step-buttons/step-buttons.component';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

import { ProjectsComponent } from './components/form-preview/projects/projects.component';
import { StacklistComponent } from './components/form-preview/stacklist/stacklist.component';
import { LanguagesComponent } from './components/form-preview/languages/languages.component';
import { EditButtonsComponent } from './components/form-preview/edit-buttons/edit-buttons.component';
import { CertificatesComponent } from './components/form-preview/certificates/certificates.component';
import { JobExperienceComponent } from './components/form-preview/job-experience/job-experience.component';
import { AcademicEducationComponent } from './components/form-preview/academic-education/academic-education.component';

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

    ProjectsComponent,
    StacklistComponent,
    LanguagesComponent,
    EditButtonsComponent,
    CertificatesComponent,
    JobExperienceComponent,
    AcademicEducationComponent,
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
    TooltipModule,
    TabViewModule,
    InputTextModule,
    AccordionModule,
    ConfirmPopupModule,

    RouterModule.forChild(routes)
  ]
})
export default class SignupModule { }
