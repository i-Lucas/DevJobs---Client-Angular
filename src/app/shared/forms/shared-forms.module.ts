import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
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

@NgModule({
  declarations: [
    AddressFormComponent,
    PasswordFormComponent,
    EmailFormComponent,
    CompanyDetailsFormComponent,
    CompanyContactFormComponent,
    CompanySocialNetworkFormComponent,
    CompanyAccountFormComponent,
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
    InputTextareaModule
  ],
  exports: [
    AddressFormComponent,
    PasswordFormComponent,
    EmailFormComponent,
    CompanyDetailsFormComponent,
    CompanyContactFormComponent,
    CompanySocialNetworkFormComponent,
    CompanyAccountFormComponent
  ]
})

export class SharedFormsModule { }
