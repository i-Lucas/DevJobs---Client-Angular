import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

import { HiringListService } from '../../services/hiring-list.service';
import { NewRecruitmentFormService } from '../../services/new-recruitment.service';

/* 
  TODO 
  
  * Ainda tenho que resolver o problema do recrutador definir um tempo mínimo de experiência em cada stack 
  
*/

@Component({
  selector: 'company-new-hiring-process',
  templateUrl: './new-hiring-process.component.html',
})
export class NewHiringProcessComponent implements OnDestroy {

  protected destroy$ = new Subject<void>();

  protected startNewProcess: boolean = true;
  protected hiringProcessForm: FormGroup | undefined;

  protected workloadList = this.recruitmentFormService.getWorkloadList();
  protected categoryList = this.recruitmentFormService.getCategoryList();
  protected seniorityList = this.recruitmentFormService.getSeniorityList();
  protected contractTypeList = this.recruitmentFormService.getContractTypes();
  protected locationTypeList = this.recruitmentFormService.getLocationTypes();

  protected openConfirmationModal: boolean = false;

  // inscrições
  protected minDate: Date | undefined; 
  protected maxDate: Date | undefined;

  constructor(
    private hiringService: HiringListService,
    private recruitmentFormService: NewRecruitmentFormService,
  ) {

    this.setupHiringForm();
    this.setupMinAndMaxCalendarDates(3, 14);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected setupHiringForm() {

    this.hiringProcessForm = this.recruitmentFormService.getNewProcessForm();
    this.setupFormListeners();
  }

  protected createProcess() {

    this.startNewProcess = false;
    this.openConfirmationModal = false;

    if (this.hiringProcessForm) {

      const formData = this.hiringProcessForm.value;

      // id, createdAt e updatedAt virão do backend
      const data: HiringProcessForm = {
        ...formData,
        // id: now,
        // createdAt: now,
        // updatedAt: now,
        salaryRange: this.getFormattedSalaryRange(formData),
        deadline: new Date(formData.deadline).getTime().toString()
      };

      console.log(data);
      this.hiringService.addHiringProcess(data);

      // requisição

    }
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

  private setupMinAndMaxCalendarDates(min: number, max: number) {

    const today = new Date();

    let minDate = new Date(today);
    minDate.setDate(today.getDate() + min);

    let maxDate = new Date(today);
    maxDate.setDate(today.getDate() + max);

    this.minDate = minDate;
    this.maxDate = maxDate;
  }

  private setupFormListeners() {
    this.setupCategoryListener();
    this.setupSeniorityListener();
    this.setupNegotiableSalaryListner();
    this.setupEnableSuggestionsListener();
  }

}