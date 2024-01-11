import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

import { CommonSignupService } from '../../services/common-signup.service';

@Component({
  selector: 'app-developer-signup',
  templateUrl: './developer-signup.component.html',
})
export class DeveloperSignupComponent extends CommonSignupService {

  protected currentStep: number = 9;

  protected aboutForm: FormGroup = this.developerFormService.getDeveloperAboutForm();
  protected contactForm: FormGroup = this.developerFormService.getDeveloperContactForm();
  protected projectsForm: FormGroup = this.developerFormService.getDeveloperProjectsForm();
  protected languagesForm: FormGroup = this.developerFormService.getDeveloperLanguagesForm();
  protected stackListForm: FormGroup = this.developerFormService.getDeveloperStacklistForm();
  protected certificatesForm: FormGroup = this.developerFormService.getDeveloperCertificatesForm();
  protected jobExperiencesForm: FormGroup = this.developerFormService.getDeveloperJobExperiencesForm();
  protected academicEducationForm: FormGroup = this.developerFormService.getDeveloperAcademicEducationForm();

  protected addressForm: FormGroup = this.developerFormService.getAddressForm();
  protected passwordForm: FormGroup = this.developerFormService.getPasswordForm();

  protected stepMessages: string[] = [
    'Vamos começar! Me fale um pouco mais sobre você.',
    'Ótimo! Agora, nos diga como podemos te encontrar.',
    'Ótimo! Agora, nos diga como podemos te encontrar.',
    'Excelente! Compartilhe sua trajetória acadêmica conosco.', // 3
    'Agora, vamos falar sobre suas experiências profissionais recentes.', // 4
    'Legal! Conte-nos sobre os certificados que você possui.', // 5
    'Interessante! Fale-nos sobre os projetos em que esteve envolvido.', // 6
    'Muito bom! Compartilhe conosco os idiomas que você domina.', // 7
    'Ótimo! Diga-nos quais ferramentas e tecnologias você utiliza.', // 8
    'Quase lá! Defina sua senha e finalize o cadastro.'
  ];

  constructor(
    protected override componentService: BaseComponentService,
    private developerFormService: DeveloperFormService,

  ) {

    super(componentService);
  }

  protected changeStep(step: 'NEXT' | 'PREVIOUS') {
    step === 'NEXT' ? this.currentStep++ : this.currentStep--;
  }

  protected onSave(currentForm: FormGroup) {

    switch (this.currentStep) {

      case 3:

        break;

    }

  }

  protected finalizeRegistration() {

  }

}