import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent implements OnInit, OnDestroy {

  protected addressForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm() {

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

  private cepControlListener() {

    const cepControl = this.addressForm.get('cep');

    cepControl?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        filter(() => cepControl.valid),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {

        const url = 'https://brasilapi.com.br/api/cep/v1/'.concat(cepControl.value);

        this.httpClient
          .get<ApiResponseAddressData>(url)
          .subscribe(response => {
            if (response) { this.updateFormValues(response) }
          });
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
