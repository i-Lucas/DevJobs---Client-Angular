import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import MockService from '../../services/mock.service';

import { CommonSignupService } from '../../services/common-signup.service';
// import { FromMillisecondsToMonthYearPipe } from '@app-pipes/date-formatter.pipe';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

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
export class DeveloperSignupComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  protected addressForm: FormGroup = this.developerFormService.getAddressForm();
  protected passwordForm: FormGroup = this.developerFormService.getPasswordForm();
  protected aboutForm: FormGroup = this.developerFormService.getDeveloperAboutForm();
  protected contactForm: FormGroup = this.developerFormService.getDeveloperContactForm();

  protected stackList: DeveloperProfileStackList[] = this.mock.getStackList(50);
  protected stackListForm: FormGroup = this.developerFormService.buildDeveloperStacklistForm();

  protected languagesList: DeveloperProfileLanguages[] = []
  protected languagesForm: FormGroup = this.developerFormService.buildDeveloperLanguagesForm();

  protected projectsList: DeveloperProfileProjects[] = this.mock.getProjects(50);
  protected projectsForm: FormGroup = this.developerFormService.buildDeveloperProjectsForm();

  protected certificatesList: DeveloperProfileCertificates[] = this.mock.getCertificates(50);
  protected certificatesForm: FormGroup = this.developerFormService.buildDeveloperCertificatesForm();

  protected jobExperiencesList: DeveloperProfileJobExperiences[] = this.mock.getJobs(50);
  protected jobExperiencesForm: FormGroup = this.developerFormService.buildDeveloperJobExperiencesForm();

  protected academicEducationList: DeveloperProfileAcademicEducation[] = this.mock.getEducation(50);
  protected academicEducationForm: FormGroup = this.developerFormService.buildDeveloperAcademicEducationForm();

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

  protected currentStep: number = 0;

  constructor(
    private mock: MockService,
    private cdRef: ChangeDetectorRef,
    private componentService: CommonComponentService,
    private commomSignupService: CommonSignupService,
    private developerFormService: DeveloperFormService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private removeItem(list: DeveloperProfileListFields[], id: string) {
    const index = list.findIndex(item => item.id === id);
    index !== -1 && list.splice(index, 1);
  }

  private handleFormEdit(
    form: FormGroup,
    item: DeveloperProfileListFields & { from?: string; to?: string },
    list: DeveloperProfileListFields[],
  ) {

    // if (item.from && item.to) {
    //   item.from = this.fromMillisecondsToMonthYearPipe.transform(item.from);
    //   item.to = this.fromMillisecondsToMonthYearPipe.transform(item.to);
    // }

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
    list.push(this.manipulateFormValue(form.value));
    form.reset();
  }

  private manipulateFormValue(formValue: FormGroup['value']) {

    const now = new Date().getTime().toString();

    const formData = {
      id: now,
      createdAt: now,
      updatedAt: now,
      ...formValue,
    };

    if (formData.from) {
      formData.to = this.componentService.convertToMilliseconds(formValue.to);
      formData.from = this.componentService.convertToMilliseconds(formValue.from);
    }

    if (formData.workload) {
      delete formData.workload_tmp;
      formData.workload = formValue.workload.concat(' ', formValue.workload_tmp);
    }

    return formData
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
        email: contact.email.email, // form composition
        id: undefined // important 
      },
      address: {
        ...this.addressForm.value,
        id: undefined // important 
      },
      password: this.passwordForm.value,
      academic_education: purgeIds(this.academicEducationList),
      professional_experiences: purgeIds(this.jobExperiencesList),
      certificates: purgeIds(this.certificatesList),
      languages: purgeIds(this.languagesList),
      projects: purgeIds(this.projectsList),
      stack: purgeIds(this.stackList),
    }

    this.commomSignupService.performSignupRequest(body, '/account/create-dev-account');
  }

  protected changeStep(step: 'NEXT' | 'PREVIOUS') {
    step === 'NEXT' ? this.currentStep++ : this.currentStep--;
  }

  protected onEmailAvailabilityError(event: ApiError) {
    this.commomSignupService.showMessage({ type: 'error', detail: event.message })
  }

  protected onCepExternApiError(event: ApiError) {
    this.commomSignupService.showMessage({ type: 'error', detail: event.message })
  }

}