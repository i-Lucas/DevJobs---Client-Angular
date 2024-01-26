import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CommonFormService } from '../commom-forms/common-forms.service';
import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';

@Injectable()
export class DeveloperFormService extends BaseFormService {

  constructor(
    private formBuilder: FormBuilder,
    private commomFormService: CommonFormService
  ) {

    super()

  }

  public getDeveloperWorkload(): DropdownOptionsList[] {
    return [
      { name: 'Horas' },
      { name: 'Meses' },
      { name: 'Anos' },
    ];
  }

  public getDeveloperProfileCourseTypes(): DropdownOptionsList[] {
    return [
      { name: 'Graduação' },
      { name: 'Bacharelado' },
      { name: 'Licenciatura' },
      { name: 'Tecnólogo' },
      { name: 'Mestrado' },
      { name: 'Doutorado' },
      { name: 'Técnico' },
      { name: 'Pós-graduação' },
      { name: 'Estágio' },
      { name: 'Curso Livre' },
    ];
  }

  public getDeveloperProfileCourseModality(): DropdownOptionsList[] {
    return [
      { name: 'Educação à distância' },
      { name: 'Presencial' },
      { name: 'Semi-presencial' },
    ];
  }

  public getDeveloperProfileCourseStatus(): DropdownOptionsList[] {
    return [
      { name: 'Cursando' },
      { name: 'Concluído' },
      { name: 'Trancado' },
      { name: 'Abandonado' },
      { name: 'Interrompido' },
    ];
  }

  public getDeveloperProfileLanguageLevel(): DropdownOptionsList[] {
    return [
      { name: 'Básico' },
      { name: 'Intermediário' },
      { name: 'Avançado' },
      { name: 'Proficiente' },
    ];
  }

  public getDeveloperAboutForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required]],
      occupation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      resume: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);
  }

  public getDeveloperContactForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      id: [''],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      github: ['', [Validators.required, this.validatePattern(this.githubPattern)]],
      linkedin: ['', [Validators.required, this.validatePattern(this.linkedinPattern)]],
      email: this.commomFormService.getEmailForm(),
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);
  }

  public buildDeveloperProjectsForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      title: ['', [Validators.required, Validators.minLength(3)]],
      resume: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
      link: ['', [Validators.required]],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public buildDeveloperLanguagesForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      language: ['', [Validators.required, Validators.minLength(3)]],
      level: ['', [Validators.required]],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);
  }

  public buildDeveloperStacklistForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      name: ['', [Validators.required, Validators.minLength(3)]],
      workload: ['', [Validators.required, Validators.pattern(this.workloadPattern)]],
      workload_tmp: ['', [Validators.required]],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public buildDeveloperCertificatesForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      course: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      institution: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      workload: ['', [Validators.required, Validators.pattern(this.workloadPattern)]],
      workload_tmp: ['', [Validators.required]],
      link: ['', [Validators.required]],
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public buildDeveloperJobExperiencesForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      company: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      occupation: ['', [Validators.required, Validators.maxLength(30)]],
      resume: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
      current_job: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    }

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }



  public buildDeveloperAcademicEducationForm(isEditMode: boolean = false): FormGroup {

    const formGroupConfig = {
      institution: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      course: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      modality: ['', [Validators.required]],
      status: ['', [Validators.required]],
      type: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    };

    if (isEditMode) {
      this.addEditFieldsToFormGroup(formGroupConfig);
    }

    return this.formBuilder.group(formGroupConfig);

  }

  public getAddressForm(isEditMode: boolean = false): FormGroup {
    return this.commomFormService.getAddressForm(isEditMode);
  }

  public getPasswordForm(): FormGroup {
    return this.commomFormService.getPasswordForm()
  }

}