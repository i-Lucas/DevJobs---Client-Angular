import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FromMillisecondsToMonthYearPipe } from '@app-pipes/date-formatter.pipe';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-education',
  templateUrl: './dev-profile-education.component.html',
})
export class DevProfileEducationComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;

  @Output() onSave = new EventEmitter<DeveloperEditModeOnSave>();
  @Input() educationList: DeveloperProfile['academic_education'] | undefined;

  protected isModalOpen: boolean = false;
  protected academicEducationFormList: FormGroup[] | undefined;

  constructor(
    private formService: DeveloperFormService,
    private fromMillisecondsToMonthYearPipe: FromMillisecondsToMonthYearPipe
  ) { }

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.isModalOpen = true
    }
  ]

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOwner) {
      if (changes['educationList'] && changes['educationList'].currentValue) {
        if (this.educationList) {
          this.updateAcademicFormsList(this.educationList)
        }
      }
    }
  }

  private updateAcademicFormsList(educationList: DeveloperProfileAcademicEducation[]) {
    this.academicEducationFormList = educationList.map(education =>
      this.createAcademicEducationForm(education)
    );
  }

  private createAcademicEducationForm(education: DeveloperProfileAcademicEducation): FormGroup {

    const EDIT_MODE: boolean = true;
    const form = this.formService.buildDeveloperAcademicEducationForm(EDIT_MODE);

    form.patchValue({
      ...education,
      from: this.fromMillisecondsToMonthYearPipe.transform(education.from),
      to: this.fromMillisecondsToMonthYearPipe.transform(education.to),
    });

    return form;

  }
  
}