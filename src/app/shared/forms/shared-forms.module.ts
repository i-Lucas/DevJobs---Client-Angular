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

import { EmailFormComponent } from './components/email-form/email-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { CompanyDetailsFormComponent } from './components/company-details-form/company-details-form.component';
import { CompanyContactFormComponent } from './components/company-contact-form/company-contact-form.component';
import { CompanyAccountFormComponent } from './components/company-account-form/company-account-form.component';
import { CompanySocialNetworkFormComponent } from './components/company-social-network-form/company-social-network-form.component';
import { CommonFormService } from './services/builder/commom-forms/common-forms.service';
import { CompanyFormService } from './services/builder/company-forms/company-form.service';

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
