import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';
import { CommonFormService } from '@app-shared-forms/services/builder/commom-forms/common-forms.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent extends BaseFormService implements OnInit, OnDestroy {

  protected addressForm: FormGroup = this.formService.getAddressForm();

  @Output() cepExternApiError = new EventEmitter<ApiError>();

  constructor(private httpService: HttpService, private formService: CommonFormService) {
    super()
  }

  ngOnInit(): void {

    this.setFormControlListener({
      formControl: this.addressForm.get('cep'),
      callbackFunction: formControl => this.getAddressFromCep(formControl)
    })
  }

  private getAddressFromCep(cepControl: AbstractControl) {

    const cep = cepControl.value;
    const EXTERNAL_REQUEST: boolean = true;
    const url = 'https://brasilapi.com.br/api/cep/v1/'.concat(cep.replace(/-/g, ''))

    this.httpService
      .get<ApiResponseAddressData>(url, EXTERNAL_REQUEST)
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (response) => {
          if (response) { this.updateFormValues(response) }
        },
        error: (error: ApiError) => {
          this.cepExternApiError.emit(error);
        }
      })
  }

  private updateFormValues(response: ApiResponseAddressData) {

    this.addressForm.get('city')?.setValue(response.city);
    this.addressForm.get('state')?.setValue(response.state);
    this.addressForm.get('address')?.setValue(response.street);
    this.addressForm.get('neighborhood')?.setValue(response.neighborhood);
  }

}
