import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { BaseComponentService } from '@app-services/components/base-component.service';
import { CompanyFormService } from '@app-shared-forms/services/builder/company-forms/company-form.service';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html'
})
export class CompanySignupComponent implements OnDestroy {

  protected currentStep: number = 0;

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  protected stepMessages: string[] = [
    'Vamos lá! Primeiro, iremos criar a sua conta',
    'Excelente! Agora, forneça detalhes sobre a sua empresa.',
    'Agora, nos informe o endereço completo da sua empresa.',
    'Vamos adicionar as redes sociais da sua empresa. Compartilhe os links conosco.',
    'Ótimo, e agora para finalizar forneça as informações de contato da sua empresa.',
  ];

  constructor(
    private componentService: BaseComponentService,
    private companyFormService: CompanyFormService,

  ) {

    this.componentService
      .getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading = state)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected addressForm: FormGroup = this.companyFormService.getAddressForm();
  protected accountForm: FormGroup = this.companyFormService.getCompanyAccountForm();
  protected detailsForm: FormGroup = this.companyFormService.getCompanyDetailsForm();
  protected contactForm: FormGroup = this.companyFormService.getCompanyContactForm();
  protected socialNetworkForm: FormGroup = this.companyFormService.getCompanySocialNetworkForm();

  protected onEmailAvailabilityError(error: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: error.message })
  }

  protected onCepExternApiError(error: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: error.message })
  }

  protected changeStep(step: 'NEXT' | 'PREVIOUS') {
    step === 'NEXT' ? this.currentStep++ : this.currentStep--;
  }

  protected finalizeRegistration() {

  }

}