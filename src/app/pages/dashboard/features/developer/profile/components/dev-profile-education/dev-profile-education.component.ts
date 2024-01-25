import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FromMSToMonthYearPipe } from '@app-pipes/date-formatter.pipe';
import { DeveloperProfileService } from '../../services/developer-profile.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-education',
  templateUrl: './dev-profile-education.component.html',
})
export class DevProfileEducationComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;
  @Input() educationList: DeveloperProfile['academic_education'] | undefined;

  @Output() onEdit = new EventEmitter<RequestDeveloperProfileUpdate<any>>();
  @Output() onDelete = new EventEmitter<RequestDeveloperProfileDelete<any>>();

  protected isModalOpen: boolean = false;
  protected editLoading: boolean = false;
  protected academicEducationFormList: FormGroup[] | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: DeveloperFormService,
    private componentService: CommonComponentService,
    private developerProfileService: DeveloperProfileService,
    private fromMillisecondsToMonthYearPipe: FromMSToMonthYearPipe
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

  protected updateAcademicEducation(form: FormGroup) {

    this.editLoading = true

    const body = {
      ...form.value,
      to: this.componentService.fromMMYYYYToMS(form.value.to).toString(),
      from: this.componentService.fromMMYYYYToMS(form.value.from).toString()
    };

    this.onEdit.emit({
      data: body,
      identifier: 'DEVELOPER_EDUCATION',
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperProfileEducation(body);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    });

  }

  protected confirmDelete(event: Event, id: string) {
    this.componentService.confirmEvent(event, undefined, () => {
      this.deleteAcademicEducation(id);
    });
  };

  protected deleteAcademicEducation(id: string) {

    this.editLoading = true

    this.onDelete.emit({
      body: { id, identifier: 'DEVELOPER_EDUCATION' },
      onError: (error) => {
        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      },
      onSuccess: (response) => {
        this.editLoading = false
        this.removeFormFromList(id);
        this.developerProfileService.deleteDeveloperProfileEducation(id);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      }
    })
  }

  private removeFormFromList(id: string) {
    if (this.academicEducationFormList) {
      this.academicEducationFormList = this.academicEducationFormList.filter(eduForm => eduForm.value.id !== id);
      this.cdr.detectChanges();
    }
  }

}