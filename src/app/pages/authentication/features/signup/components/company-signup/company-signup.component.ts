import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonSignupService } from '../../services/common-signup.service';

import { BaseComponentService } from '@app-services/components/base-component.service';
import { CompanyFormService } from '@app-shared-forms/services/builder/company-forms/company-form.service';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html'
})
export class CompanySignupComponent extends CommonSignupService {

  protected override currentStep: number = 0;

  protected stepMessages: string[] = [
    'Vamos lá! Primeiro, iremos criar a sua conta',
    'Excelente! Agora, forneça detalhes sobre a sua empresa.',
    'Agora, nos informe o endereço completo da sua empresa.',
    'Vamos adicionar as redes sociais da sua empresa. Compartilhe os links conosco.',
    'Ótimo, e agora para finalizar forneça as informações de contato da sua empresa.',
  ];

  constructor(
    protected override httpService: HttpService,
    private companyFormService: CompanyFormService,
    protected override componentService: BaseComponentService,
  ) {

    super(httpService, componentService);
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

    this.performSignupRequest(body, '/account/create-company-account');
  }

}

/*

  {"details":
    {
      "fantasy_name":"Empresa Angular 17",
      "description":"Descrição",
      "foundedIn":"2024",
      "teamSize":"(20 - 50 colaboradores)",
      "marketArea":"Tech",
      "legalNature":"ME",
      "cnpj":"00.000.000/0000-00",
      "socialReason":"Angular 17",
      "about":"lucas@dev.com.br"
    },
      "address":
      {
        "cep":"41900-485",
        "address":"Rua Brasília",
        "number":"101",
        "neighborhood":"Amaralina",
        "city":"Salvador",
        "complement":"Apt",
        "state":"BA"
      },"suport":{"whatsapp":"(00)-0-0000-0000","phone":"(00)-0-0000-0000","rhEmail":"lucas@dev.com.br","supportEmail":"lucas@dev.com.br"},"social":{"website":"https://www.google.com.br/","linkedin":"https://www.google.com.br/","facebook":"https://www.google.com.br/","twitter":"https://www.google.com.br/","instagram":"https://www.google.com.br/","github":"https://www.google.com.br/"},"account":{"name":"Lucas","email":"lucas@dev.com.br","phone":"(00)-0-0000-0000","password":"@LL123","confirm":"@LL123"}}

*/