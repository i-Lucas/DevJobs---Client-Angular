import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CommonSignupService } from '../../services/common-signup.service';

import { AppStateService } from '@app-services/app/app.service';
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
    private appService: AppStateService,
    private companyFormService: CompanyFormService,
    private commomSignupService: CommonSignupService
  ) {

    this.appService
      .getIsRequestInProgress()
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

  protected finalizeRegistration() {

    const account = this.accountForm.value

    const body = {
      details: this.detailsForm.value,
      address: this.addressForm.value,
      suport: this.contactForm.value,
      social: this.socialNetworkForm.value,
      account: {
        ...account,
        email: account.email.email,
        password: account.password.password,
        confirm: account.password.confirm,
      }
    }

    this.commomSignupService.performSignupRequest(body, '/account/create-company-account');
  }

  protected onEmailAvailabilityError(event: ApiError) {
    this.commomSignupService.showMessage({ type: 'error', detail: event.message })
  }

  protected onCepExternApiError(event: ApiError) {
    this.commomSignupService.showMessage({ type: 'error', detail: event.message })
  }

  protected changeStep(step: 'NEXT' | 'PREVIOUS') {
    step === 'NEXT' ? this.currentStep++ : this.currentStep--;
  }

}