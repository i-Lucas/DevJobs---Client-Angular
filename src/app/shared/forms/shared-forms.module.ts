import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonFormService } from './services/builder/commom-forms/common-forms.service';
import { CompanyFormService } from './services/builder/company-forms/company-form.service';

import { EmailFormComponent } from './components/common-forms/email-form/email-form.component';
import { AddressFormComponent } from './components/common-forms/address-form/address-form.component';
import { PasswordFormComponent } from './components/common-forms/password-form/password-form.component';

import { CompanyDetailsFormComponent } from './components/company-forms/company-details-form/company-details-form.component';
import { CompanyContactFormComponent } from './components/company-forms/company-contact-form/company-contact-form.component';
import { CompanyAccountFormComponent } from './components/company-forms/company-account-form/company-account-form.component';
import { CompanySocialNetworkFormComponent } from './components/company-forms/company-social-network-form/company-social-network-form.component';

import { DeveloperAboutFormComponent } from './components/developer-forms/developer-about-form/developer-about-form.component';
import { DeveloperContactFormComponent } from './components/developer-forms/developer-contact-form/developer-contact-form.component';
import { DeveloperProjectsFormComponent } from './components/developer-forms/developer-projects-form/developer-projects-form.component';
import { DeveloperLanguagesFormComponent } from './components/developer-forms/developer-languages-form/developer-languages-form.component';
import { DeveloperStacklistFormComponent } from './components/developer-forms/developer-stacklist-form/developer-stacklist-form.component';
import { DeveloperCertificatesFormComponent } from './components/developer-forms/developer-certificates-form/developer-certificates-form.component';
import { DeveloperJobExperiencesFormComponent } from './components/developer-forms/developer-job-experiences-form/developer-job-experiences-form.component';
import { DeveloperAcademicEducationFormComponent } from './components/developer-forms/developer-academic-education-form/developer-academic-education-form.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    PasswordFormComponent,
    EmailFormComponent,
    CompanyDetailsFormComponent,
    CompanyContactFormComponent,
    CompanySocialNetworkFormComponent,
    CompanyAccountFormComponent,

    DeveloperAboutFormComponent,
    DeveloperContactFormComponent,
    DeveloperProjectsFormComponent,
    DeveloperLanguagesFormComponent,
    DeveloperStacklistFormComponent,
    DeveloperCertificatesFormComponent,
    DeveloperJobExperiencesFormComponent,
    DeveloperAcademicEducationFormComponent,
  ],
  providers: [
    CommonFormService,
    CompanyFormService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    InputTextModule,
    InputMaskModule,
    PasswordModule,
    DividerModule,
    DropdownModule,
    CalendarModule,
    ToggleButtonModule,
    InputTextareaModule
  ],
  exports: [
    AddressFormComponent,
    PasswordFormComponent,
    EmailFormComponent,
    
    CompanyDetailsFormComponent,
    CompanyContactFormComponent,
    CompanySocialNetworkFormComponent,
    CompanyAccountFormComponent,

    DeveloperAboutFormComponent,
    DeveloperContactFormComponent,
    DeveloperProjectsFormComponent,
    DeveloperLanguagesFormComponent,
    DeveloperStacklistFormComponent,
    DeveloperCertificatesFormComponent,
    DeveloperJobExperiencesFormComponent,
    DeveloperAcademicEducationFormComponent,
  ]
})

export class SharedFormsModule { }
