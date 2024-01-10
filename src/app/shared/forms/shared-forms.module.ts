import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { EmailFormComponent } from './components/email-form/email-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { CompanyDetailsFormComponent } from './components/company-details-form/company-details-form.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    PasswordFormComponent,
    EmailFormComponent,
    CompanyDetailsFormComponent
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
    EmailFormComponent
  ]
})

export class SharedFormsModule { }
