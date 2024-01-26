import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';

@Injectable()
export class CommonFormService extends BaseFormService {

  protected passwordForm!: FormGroup;
  protected emailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    super()

    this.passwordForm = this.formBuilder.group({
      password: this.validatePassword(),
      confirm: ['', [Validators.required, this.validateConfirmPassword()]]
    });

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validatePattern(this.emailPattern)]],
    })

  }

  public getAddressForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      id: [''],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      number: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      complement: ['', [Validators.required]],
      state: ['', [Validators.required]],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);
  }

  public getPasswordForm(): FormGroup {
    return this.passwordForm
  }

  public getEmailForm(): FormGroup {
    return this.emailForm
  }

}
