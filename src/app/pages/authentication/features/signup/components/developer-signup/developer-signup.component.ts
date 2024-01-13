import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HttpService } from '@app-services/http/http.service';
import { CommonSignupService } from '../../services/common-signup.service';
import { BaseComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';
import MockService from '../../services/mock.service';

type FormMap = {
  [key in DeveloperProfileListFieldsIdentifier]: () => void;
};

type OperationMap = {
  [key in DeveloperProfileListFieldsIdentifier]: {
    edit: () => void;
    remove: () => void;
  };
};

@Component({
  selector: 'app-developer-signup',
  templateUrl: './developer-signup.component.html',
})
export class DeveloperSignupComponent extends CommonSignupService {

  protected addressForm: FormGroup = this.developerFormService.getAddressForm();
  protected passwordForm: FormGroup = this.developerFormService.getPasswordForm();
  protected aboutForm: FormGroup = this.developerFormService.getDeveloperAboutForm();
  protected contactForm: FormGroup = this.developerFormService.getDeveloperContactForm();

  protected stackList: DeveloperProfileStackList[] = this.mock.getStackList(20);
  protected stackListForm: FormGroup = this.developerFormService.getDeveloperStacklistForm();

  protected languagesList: DeveloperProfileLanguages[] = this.mock.getLanguages(10);
  protected languagesForm: FormGroup = this.developerFormService.getDeveloperLanguagesForm();

  protected projectsList: DeveloperProfileProjects[] = this.mock.getProjects(10);
  protected projectsForm: FormGroup = this.developerFormService.getDeveloperProjectsForm();

  protected certificatesList: DeveloperProfileCertificates[] = this.mock.getCertificates(10);
  protected certificatesForm: FormGroup = this.developerFormService.getDeveloperCertificatesForm();

  protected jobExperiencesList: DeveloperProfileJobExperiences[] = this.mock.getJobs(10);
  protected jobExperiencesForm: FormGroup = this.developerFormService.getDeveloperJobExperiencesForm();

  protected academicEducationList: DeveloperProfileAcademicEducation[] = this.mock.getEducation(10);
  protected academicEducationForm: FormGroup = this.developerFormService.getDeveloperAcademicEducationForm();

  protected stepMessages: string[] = [
    'Vamos começar! Me fale um pouco mais sobre você.',
    'Ótimo! Agora, nos diga como podemos te encontrar.',
    'Ótimo! Agora, nos diga como podemos te encontrar.',
    'Excelente! Compartilhe sua trajetória acadêmica conosco.',
    'Agora, vamos falar sobre suas experiências profissionais recentes.',
    'Legal! Conte-nos sobre os certificados que você possui.',
    'Interessante! Fale-nos sobre os projetos em que esteve envolvido.',
    'Muito bom! Compartilhe conosco os idiomas que você domina.',
    'Ótimo! Diga-nos quais ferramentas e tecnologias você utiliza.',
    'Quase lá! Defina sua senha e finalize o cadastro.'
  ];

  protected override currentStep: number = 0;

  constructor(
    private mock: MockService,
    private cdRef: ChangeDetectorRef,
    protected override httpService: HttpService,
    private developerFormService: DeveloperFormService,
    protected override componentService: BaseComponentService,
  ) {
    super(httpService, componentService);
  }

  private removeItem(list: DeveloperProfileListFields[], id: string) {
    const index = list.findIndex(item => item.id === id);
    index !== -1 && list.splice(index, 1);
  }

  private handleFormEdit(
    form: FormGroup,
    item: DeveloperProfileListFields,
    list: DeveloperProfileListFields[]
  ) {

    form.patchValue(item)
    this.removeItem(list, item.id!);
  }

  protected handlePreviewChanges(event: DevSignupFormPreviewEvent) {
    this.performOperation(event, event.option);
    this.cdRef.detectChanges();
  }

  protected performOperation(event: DevSignupFormPreviewEvent, operation: 'edit' | 'remove') {

    const operationMap: OperationMap = {

      'LANGUAGES': {
        edit: () => this.handleFormEdit(this.languagesForm, event.item, this.languagesList),
        remove: () => this.removeItem(this.languagesList, event.item.id!),
      },
      'PROJECTS': {
        edit: () => this.handleFormEdit(this.projectsForm, event.item, this.projectsList),
        remove: () => this.removeItem(this.projectsList, event.item.id!),
      },
      'CERTIFICATES': {
        edit: () => this.handleFormEdit(this.certificatesForm, event.item, this.certificatesList),
        remove: () => this.removeItem(this.certificatesList, event.item.id!),
      },
      'JOB_EXPERIENCES': {
        edit: () => this.handleFormEdit(this.jobExperiencesForm, event.item, this.jobExperiencesList),
        remove: () => this.removeItem(this.jobExperiencesList, event.item.id!),
      },
      'ACADEMIC_EDUCATION': {
        edit: () => this.handleFormEdit(this.academicEducationForm, event.item, this.academicEducationList),
        remove: () => this.removeItem(this.academicEducationList, event.item.id!),
      },
      'STACKLIST': {
        edit: () => { /* not editable */ },
        remove: () => this.removeItem(this.stackList, event.item.id!),
      },
    };

    operationMap[event.identifier]?.[operation]?.(); // call function

  }

  protected onSave(identifier: DevSignupFormPreviewEvent['identifier']) {

    const formMap: FormMap = {

      'LANGUAGES': () => this.addFormToList(this.languagesForm, this.languagesList),
      'PROJECTS': () => this.addFormToList(this.projectsForm, this.projectsList),
      'CERTIFICATES': () => this.addFormToList(this.certificatesForm, this.certificatesList),
      'JOB_EXPERIENCES': () => this.addFormToList(this.jobExperiencesForm, this.jobExperiencesList),
      'ACADEMIC_EDUCATION': () => this.addFormToList(this.academicEducationForm, this.academicEducationList),
      'STACKLIST': () => this.addFormToList(this.stackListForm, this.stackList),
    };

    formMap[identifier]?.();

  }

  private addFormToList(form: FormGroup, list: DeveloperProfileListFields[]) {

    const formValue = form.value;
    const now = new Date().getTime().toString();
    const strToBool = (value: string): boolean => JSON.parse(value.toLowerCase());

    const formData = {
      id: now,
      createdAt: now,
      updatedAt: now,
      ...formValue,
    };

    if (form.value.from) {
      formData.to = this.componentService.convertToMilliseconds(formValue.to);
      formData.from = this.componentService.convertToMilliseconds(formValue.from);
      form.value.current_job && (formData.current_job = strToBool(form.value.current_job));
    }

    if (formData.workload) {
      delete formData.workload_tmp;
      formData.workload = formValue.workload.concat(' ', formValue.workload_tmp);
    }

    list.push(formData);
    form.reset();
  }

  protected finalizeRegistration() {

    function purgeIds<T extends { id?: string }>(list: T[]): Omit<T, 'id'>[] {
      return list.length > 0 ? list.map(({ id, ...rest }) => rest) : []
    }

    const contact = this.contactForm.value;

    const body = {
      about: this.aboutForm.value,
      contact: {
        ...contact,
        email: contact.email.email  // form composition
      },
      address: this.addressForm.value,
      password: this.passwordForm.value,
      academic_education: purgeIds(this.academicEducationList),
      professional_experiences: purgeIds(this.jobExperiencesList),
      certificates: purgeIds(this.certificatesList),
      languages: purgeIds(this.languagesList),
      projects: purgeIds(this.projectsList),
      stack: purgeIds(this.stackList),
    }

    this.performSignupRequest(body, '/account/create-dev-account');
  }

}