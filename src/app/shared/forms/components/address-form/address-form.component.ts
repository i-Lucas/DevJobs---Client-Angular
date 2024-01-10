import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent implements OnInit, OnDestroy {

  protected addressForm!: FormGroup;
  private destroy$ = new Subject<void>();

  @Output() cepExternApiError = new EventEmitter<ApiError>();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {

    this.addressForm = this.formBuilder.group({
      cep: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      number: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      complement: ['', [Validators.required]],
      state: ['', [Validators.required]],
    })

    if (this.addressForm) {
      this.cepControlListener();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cepControlListener() {

    const cepControl = this.addressForm.get('cep');

    cepControl?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        filter(() => cepControl.valid),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.getAddressFromCep(cepControl.value));
  }

  private getAddressFromCep(cep: string) {

    const EXTERNAL_REQUEST: boolean = true;
    const apiurl = 'https://brasilapi.com.br/api/cep/v1/';

    this.httpService
      .get<ApiResponseAddressData>(apiurl.concat(cep.replace(/-/g, "")), EXTERNAL_REQUEST)
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

  public getForm() {
    return this.addressForm
  }

}
