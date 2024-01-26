import { FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FromMSToMonthYearPipe } from '@app-pipes/date-formatter.pipe';
import { DeveloperProfileService } from '../../services/developer-profile.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-experiences',
  templateUrl: './dev-profile-experiences.component.html',
})
export class DevProfileExperiencesComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;
  @Input() experiencesList: DeveloperProfile['professional_experiences'] | undefined;

  @Output() onAdd = new EventEmitter<RequestDeveloperProfileAdd<any>>();
  @Output() onEdit = new EventEmitter<RequestDeveloperProfileUpdate<any>>();
  @Output() onDelete = new EventEmitter<RequestDeveloperProfileDelete<any>>();

  private identifier: DeveloperProfileEditFieldsIdentifier = 'DEVELOPER_EXPERIENCES'

  protected editLoading: boolean = false;
  protected isModalOpen: boolean = false;
  protected experiencesFormList: FormGroup[] | undefined;

  protected addingNewField: boolean = false;
  protected newFieldForm: FormGroup | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: DeveloperFormService,
    private componentService: CommonComponentService,
    private developerProfileService: DeveloperProfileService,
    private fromMillisecondsToMonthYearPipe: FromMSToMonthYearPipe
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOwner) {
      if (changes['experiencesList'] && changes['experiencesList'].currentValue) {
        if (this.experiencesList) {
          this.createExperienceForms(this.experiencesList)
        }
      }
    }
  }

  private createExperienceForms(experiencesList: DeveloperProfileJobExperiences[]) {

    this.experiencesFormList = experiencesList.map(experience => {

      const EDIT_MODE: boolean = true;
      const form = this.formService.buildDeveloperJobExperiencesForm(EDIT_MODE);

      form.patchValue({
        ...experience,
        from: this.fromMillisecondsToMonthYearPipe.transform(experience.from),
        to: this.fromMillisecondsToMonthYearPipe.transform(experience.to),
      });

      return form;

    })
  }

  protected onCloseModal() {
    this.isModalOpen = false
    this.addingNewField = false
    this.newFieldForm = undefined
  }

  protected onAdding() {
    this.isModalOpen = true
    this.addingNewField = true
    this.newFieldForm = this.formService.buildDeveloperJobExperiencesForm();
  }

  protected addNewField(form: FormGroup) {

    const data = {
      ...form.value,
      to: this.componentService.fromMMYYYYToMS(form.value.to).toString(),
      from: this.componentService.fromMMYYYYToMS(form.value.from).toString()
    };

    this.editLoading = true

    this.onAdd.emit({
      data, identifier: this.identifier,
      onSuccess: (response) => {

        this.editLoading = false
        this.newFieldForm?.reset();

        this.developerProfileService.addDeveloperProfileJobExperienceToList(response.data);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    })
  }

  protected updateJobExperience(form: FormGroup) {

    this.editLoading = true

    const body = {
      ...form.value,
      to: this.componentService.fromMMYYYYToMS(form.value.to).toString(),
      from: this.componentService.fromMMYYYYToMS(form.value.from).toString()
    };

    this.onEdit.emit({
      data: body,
      identifier: this.identifier,
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperProfileJobExperiences(body);
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
      this.deleteJobExperience(id);
    });
  };

  protected deleteJobExperience(id: string) {

    this.editLoading = true

    this.onDelete.emit({
      body: { id, identifier: this.identifier },
      onError: (error) => {
        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      },
      onSuccess: (response) => {
        this.editLoading = false
        this.removeFormFromList(id);
        this.developerProfileService.deleteDeveloperProfileJobExperience(id);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      }
    })
  }

  private removeFormFromList(id: string) {
    if (this.experiencesFormList) {
      this.experiencesFormList = this.experiencesFormList.filter(form => form.value.id !== id);
      this.cdr.detectChanges();
    }
  }

}