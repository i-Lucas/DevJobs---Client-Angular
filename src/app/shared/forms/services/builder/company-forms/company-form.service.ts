import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonFormService } from '../commom-forms/common-forms.service';
import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';

@Injectable()
export class CompanyFormService extends BaseFormService {

  constructor(
    private formBuilder: FormBuilder,
    private commomFormService: CommonFormService
  ) {
    
    super()
  }

  public getCompanyAccountForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: this.commomFormService.getEmailForm(),
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: this.commomFormService.getPasswordForm()
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public getCompanyDetailsForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      fantasy_name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      foundedIn: ['', [Validators.required, this.validatePattern(/^(19|20)\d{2}$/)]],
      teamSize: ['', [Validators.required]],
      marketArea: ['', [Validators.required]],
      legalNature: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      socialReason: ['', [Validators.required]],
      about: ['', [Validators.required]]
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public getCompanySocialNetworkForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      website: [''],
      linkedin: [''],
      facebook: [''],
      twitter: [''],
      instagram: [''],
      github: [''],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public getCompanyContactForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      whatsapp: [''],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      rhEmail: ['', [Validators.required, this.validatePattern(this.emailPattern)]],
      supportEmail: ['', [Validators.required, this.validatePattern(this.emailPattern)]],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public getAddressForm(isEditMode: boolean = false): FormGroup {
    return this.commomFormService.getAddressForm(isEditMode);
  }

}
