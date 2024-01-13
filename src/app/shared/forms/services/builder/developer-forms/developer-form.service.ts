import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';
import { CommonFormService } from '../commom-forms/common-forms.service';

@Injectable()
export class DeveloperFormService extends BaseFormService {

  private aboutForm: FormGroup;
  private contactForm: FormGroup;
  private projectsForm: FormGroup;
  private languagesForm: FormGroup;
  private stackListForm: FormGroup;
  private certificatesForm: FormGroup;
  private jobExperiencesForm: FormGroup;
  private academicEducationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commomFormService: CommonFormService
  ) {

    super()

    this.aboutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required]],
      occupation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      resume: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
    })

    this.contactForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(11)]],
      github: ['', [Validators.required, this.validatePattern(this.githubPattern)]],
      linkedin: ['', [Validators.required, this.validatePattern(this.linkedinPattern)]],
      email: this.commomFormService.getEmailForm(),
    })

    this.projectsForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      resume: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
      link: ['', [Validators.required]],
    })

    this.languagesForm = this.formBuilder.group({
      language: ['', [Validators.required, Validators.minLength(3)]],
      level: ['', [Validators.required]],
    })

    this.stackListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      workload: ['', [Validators.required, Validators.pattern(this.workloadPattern)]],
      workload_tmp: ['', [Validators.required]],
    })

    this.certificatesForm = this.formBuilder.group({
      course: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      institution: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      workload: ['', [Validators.required, Validators.pattern(this.workloadPattern)]],
      workload_tmp: ['', [Validators.required]],
      link: ['', [Validators.required]],
    })

    this.jobExperiencesForm = this.formBuilder.group({
      company: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      occupation: ['', [Validators.required, Validators.maxLength(30)]],
      resume: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
      current_job: ['true', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    })

    this.academicEducationForm = this.formBuilder.group({
      institution: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      course: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      modality: ['', [Validators.required]],
      status: ['', [Validators.required]],
      type: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    })
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

  public getDeveloperAboutForm(): FormGroup {
    return this.aboutForm
  }

  public getDeveloperContactForm(): FormGroup {
    return this.contactForm
  }

  public getDeveloperProjectsForm(): FormGroup {
    return this.projectsForm
  }

  public getDeveloperLanguagesForm(): FormGroup {
    return this.languagesForm
  }

  public getDeveloperStacklistForm(): FormGroup {
    return this.stackListForm
  }

  public getDeveloperCertificatesForm(): FormGroup {
    return this.certificatesForm
  }

  public getDeveloperJobExperiencesForm(): FormGroup {
    return this.jobExperiencesForm
  }

  public getDeveloperAcademicEducationForm(): FormGroup {
    return this.academicEducationForm
  }

  public getAddressForm(): FormGroup {
    return this.commomFormService.getAddressForm();
  }

  public getPasswordForm(): FormGroup {
    return this.commomFormService.getPasswordForm()
  }

}