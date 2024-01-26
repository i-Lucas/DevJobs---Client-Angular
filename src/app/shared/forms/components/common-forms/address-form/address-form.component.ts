import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent extends BaseFormService implements OnInit, OnDestroy {

  @Input() addressForm: FormGroup | undefined;

  @Output() cepExternApiError = new EventEmitter<ApiError>();

  constructor(private httpService: HttpService) {
    super()
  }

  ngOnInit(): void {

    if (this.addressForm) {
      this.setFormControlListener({
        formControl: this.addressForm.get('cep'),
        callbackFunction: formControl => this.getAddressFromCep(formControl)
      })
    }
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
          if (response) {
            this.updateFormValues(response)
          }
        },
        error: (error: ApiError) => {
          this.clearFormFields();
          this.cepExternApiError.emit(error);
        }
      })
  }

  private clearFormFields() {

    if (this.addressForm) {
      this.addressForm.get('city')?.setValue(null);
      this.addressForm.get('state')?.setValue(null);
      this.addressForm.get('address')?.setValue(null);
      this.addressForm.get('neighborhood')?.setValue(null);
    }
  }

  private updateFormValues(response: ApiResponseAddressData) {

    if (this.addressForm) {
      this.addressForm.get('city')?.setValue(response.city);
      this.addressForm.get('state')?.setValue(response.state);
      this.addressForm.get('address')?.setValue(response.street);
      this.addressForm.get('neighborhood')?.setValue(response.neighborhood);
    }
  }

}
