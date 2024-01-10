import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonFormService } from '../commom-forms/common-forms.service';
import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyFormService extends BaseFormService {

  private detailsForm: FormGroup;
  private companyAccountForm: FormGroup;
  private socialNetworkForm: FormGroup;
  private contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commomFormService: CommonFormService
  ) {

    super()

    this.companyAccountForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: this.commomFormService.getEmailForm(),
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: this.commomFormService.getPasswordForm()
    })

    this.detailsForm = this.formBuilder.group({
      fantasy_name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      foundedIn: ['', [Validators.required, this.validatePattern(/^(19|20)\d{2}$/)]],
      teamSize: ['', [Validators.required]],
      marketArea: ['', [Validators.required]],
      legalNature: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      socialReason: ['', [Validators.required]],
      about: ['', [Validators.required]]
    })

    this.socialNetworkForm = this.formBuilder.group({
      website: [''],
      linkedin: [''],
      facebook: [''],
      twitter: [''],
      instagram: [''],
      github: [''],
    })

    this.contactForm = this.formBuilder.group({
      whatsapp: [''],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      rhEmail: ['', [Validators.required, this.validatePattern(this.emailPattern)]],
      supportEmail: ['', [Validators.required, this.validatePattern(this.emailPattern)]],
    })

  }

  public getCompanyAccountForm() {
    return this.companyAccountForm
  }

  public getCompanyDetailsForm() {
    return this.detailsForm
  }

  public getCompanySocialNetworkForm() {
    return this.socialNetworkForm
  }

  public getCompanyContactForm() {
    return this.contactForm
  }
}
