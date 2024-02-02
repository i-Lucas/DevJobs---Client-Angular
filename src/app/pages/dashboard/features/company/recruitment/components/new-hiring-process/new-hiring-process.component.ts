import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

import { NewRecruitmentFormService } from '../../services/new-recruitment.service';
import { HiringListService } from '../../services/hiring-list.service';

/*

  uma boa ideia para suprimir a dificuldade em editar o tempo mínimo de cada stack é 
  organizar a lista de candidatos com base na stack do candidato

  ex: lista dos candidatos que possuem + de 1 ano em java .. 
  dessa forma o recrutador vai ter de forma agrupada os candidatos com base no tempo
  de experiencia que eles tem em cada stack ( uma lista para cada tempo ( mes, ano ) sorted by > )
*/

@Component({
  selector: 'company-new-hiring-process',
  templateUrl: './new-hiring-process.component.html',
})
export class NewHiringProcessComponent implements OnDestroy {

  protected destroy$ = new Subject<void>();

  protected startNewProcess: boolean = false;
  protected hiringProcessForm: FormGroup | undefined;

  protected categoryList = this.recruitmentFormService.getCategoryList();
  protected seniorityList = this.recruitmentFormService.getSeniorityList();
  protected contractTypeList = this.recruitmentFormService.getContractTypes();
  protected locationTypeList = this.recruitmentFormService.getLocationTypes();
  protected workloadList = this.recruitmentFormService.getWorkloadList();

  constructor(
    private formBuilder: FormBuilder,
    private hiringService: HiringListService,
    private recruitmentFormService: NewRecruitmentFormService,
  ) {

    this.hiringProcessForm = this.formBuilder.group({

      // id: [''], 

      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]], // devops, QA, frontend, backend, fullstack ..
      seniority: ['', [Validators.required]], // júnior, pleno, sênior ...

      differences: new FormControl<string[]>([]), // lista de diferenciais ex ( Graduação em Telecomunicações )

      stacklist: new FormControl<HiringStackListForm[]>([], [control => this.minArrayLength(control, 3)]), // .. node, typescript, docker
      requirements: new FormControl<string[]>([], [control => this.minArrayLength(control, 3)]), // ... git,  metodologias ágeis
      benefits: new FormControl<string[]>([], [control => this.minArrayLength(control, 3)]),  //  ...  plano de saúde, vale refeição

      salaryRange: [''], // faixa salarial ex ( R$ 7.000,00 - R$ 8.000,00 )
      salaryRange_from: [''],
      salaryRange_to: [''],
      negotiable: [true], // salário negociável

      contractType: ['', [Validators.required]], // ...CLT, PJ, Flex, Freelance
      locationType: ['', [Validators.required]], // ... remoto, híbrido, presencial 
      workload: ['', [Validators.required]], // ... full-time, meio período 

      enableSuggestions: [true], // autocomplete

      deadline: ['', [Validators.required]], // prazo limite para inscrição,
      pcd: [false],

      // createdAt: [''],
      // updatedAt: [''],
    })

    this.setupEnableSuggestionsListener();
    this.setupSeniorityListener();
    this.setupCategoryListener();
    this.setupNegotiableSalaryListner();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // id, createdAt e updatedAt virão do backend

  protected save() {

    if (this.hiringProcessForm) {

      const formData = this.hiringProcessForm.value;
      // const now = new Date().getTime().toString();

      const data: HiringProcessForm = {
        ...formData,
        // id: now,
        // createdAt: now,
        // updatedAt: now,
        salaryRange: this.getFormattedSalaryRange(formData),
        deadline: this.getFormattedDeadline(formData.deadline),
      };

      console.log(data);
      this.hiringService.addHiringProcess(data);

      // antes de fazer a requisição tem que confirmar ... pois nao vai ser possível editar
      // depois que a vaga for publicada, nada poderá ser editado .. pq se a galera fizer subscribe e 
      // os requesitos mudarem .. vai ser compliqued

    }
  }

  private minArrayLength(control: AbstractControl, minLength: number) {
    const array = control.value as string[];
    return array && array.length >= minLength ? null : { minLength: true };
  }

  private setupEnableSuggestionsListener(): void {

    const enableSuggestions = this.hiringProcessForm?.get('enableSuggestions');
    enableSuggestions?.valueChanges.pipe(distinctUntilChanged(),
      takeUntil(this.destroy$)).subscribe((value) => {
        this.handleEnableSuggestionsChange(value)
      })
  }

  private handleEnableSuggestionsChange(value: boolean): void {
    value === false ? this.clearFormSuggestions() : this.updateFormSuggestions();
  }

  private clearFormSuggestions(): void {
    this.hiringProcessForm?.get('requirements')?.patchValue([]);
    this.hiringProcessForm?.get('stacklist')?.patchValue([]);
    this.hiringProcessForm?.get('benefits')?.patchValue([]);
    this.hiringProcessForm?.get('differences')?.patchValue([]);
  }

  private updateFormSuggestions(): void {

    const seniorityValue = this.hiringProcessForm?.get('seniority')?.value;
    const categoryValue = this.hiringProcessForm?.get('category')?.value;

    if (this.hiringProcessForm?.get('enableSuggestions')?.value === true) {
      this.updateRequirements(seniorityValue);
      this.updateStacklist(categoryValue);
      this.updateBenefitsAndDifferences();
    }
  }

  private updateRequirements(seniorityValue: SeniorityLevels): void {
    const suggestions = this.recruitmentFormService.getSuggestionsRequirements(seniorityValue);
    this.hiringProcessForm?.get('requirements')?.patchValue(suggestions);
  }

  private updateStacklist(categoryValue: any): void {
    const suggestions = this.recruitmentFormService.getSuggestionsStacklist(categoryValue);
    this.hiringProcessForm?.get('stacklist')?.patchValue(suggestions);
  }

  private updateBenefitsAndDifferences(): void {

    const benefits = this.recruitmentFormService.getSuggestionsBenefits();
    const differences = this.recruitmentFormService.getSuggestionsDifferentials();

    this.hiringProcessForm?.get('benefits')?.patchValue(benefits);
    this.hiringProcessForm?.get('differences')?.patchValue(differences);
  }

  private setupSeniorityListener(): void {

    const seniority = this.hiringProcessForm?.get('seniority');

    seniority?.valueChanges.pipe(distinctUntilChanged(),
      takeUntil(this.destroy$)).subscribe((value) => {
        this.updateSenioritySuggestions(value);
      });
  }

  private updateSenioritySuggestions(value: SeniorityLevels): void {
    if (this.hiringProcessForm?.get('enableSuggestions')?.value === true) {
      this.updateRequirements(value);
    }
  }

  private setupCategoryListener(): void {

    const category = this.hiringProcessForm?.get('category');

    category?.valueChanges.pipe(distinctUntilChanged(),
      takeUntil(this.destroy$)).subscribe((value: boolean) => {
        this.updateCategorySuggestions(value);
      })
  }

  private updateCategorySuggestions(value: boolean): void {
    if (this.hiringProcessForm?.get('enableSuggestions')?.value === true) {
      this.updateStacklist(value);
      this.updateBenefitsAndDifferences();
    }
  }

  private setupNegotiableSalaryListner() {

    const negotiable = this.hiringProcessForm?.get('negotiable');

    negotiable?.valueChanges.pipe(distinctUntilChanged(),
      takeUntil(this.destroy$)).subscribe((negotiable_value: boolean) => {

        const salaryRangeFromControl = this.hiringProcessForm?.get('salaryRange_from');
        const salaryRangeToControl = this.hiringProcessForm?.get('salaryRange_to');

        if (negotiable_value) {
          salaryRangeFromControl?.clearValidators();
          salaryRangeToControl?.clearValidators();

        } else {
          salaryRangeFromControl?.setValidators([Validators.required]);
          salaryRangeToControl?.setValidators([Validators.required]);
        }

        salaryRangeFromControl?.updateValueAndValidity();
        salaryRangeToControl?.updateValueAndValidity();

      })
  }

  private getFormattedSalaryRange(
    formData: {
      negotiable: boolean,
      salaryRange_from: string,
      salaryRange_to: string
    }) {

    if (formData.negotiable) return 'Negociável';

    const { salaryRange_from, salaryRange_to } = formData;
    return `R$ ${salaryRange_from} - R$ ${salaryRange_to}`;
  }

  private getFormattedDeadline(deadline: string) {
    return new Date(deadline).getTime().toString();
  }

}

