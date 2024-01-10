import { Component, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseFormService } from '@app-shared-forms/services/base-form.service';
import { EmailFormComponent } from '@app-shared-forms/components/email-form/email-form.component';
import { PasswordFormComponent } from '@app-shared-forms/components/password-form/password-form.component';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrl: './company-signup.component.scss'
})
export class CompanySignupComponent extends BaseFormService {

  protected currentStep: number = 0;

  protected stepMessages: string[] = [
    'Vamos lá! Primeiro, iremos criar a sua conta',
    'Excelente! Agora, forneça detalhes sobre a sua empresa.',
    'Agora, nos informe o endereço completo da sua empresa.',
    'Vamos adicionar as redes sociais da sua empresa. Compartilhe os links conosco.',
    'Ótimo, e agora para finalizar forneça as informações de contato da sua empresa.',
  ];

  @ViewChild(PasswordFormComponent, { static: true })
  passwordForm!: PasswordFormComponent | undefined;

  @ViewChild(EmailFormComponent, { static: true })
  emailForm!: EmailFormComponent | undefined;

  protected accountForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    super()

    this.accountForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: this.emailForm?.getForm(),
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: this.passwordForm?.getForm()
    })

  }

  protected onEmailAvailabilityError(error: ApiError) {
    console.log(error.message);
  }

}
