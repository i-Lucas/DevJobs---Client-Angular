import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FromMillisecondsToMonthYearPipe } from '@app-pipes/date-formatter.pipe';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-experiences',
  templateUrl: './dev-profile-experiences.component.html',
})
export class DevProfileExperiencesComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;

  @Output() onSave = new EventEmitter<DeveloperEditModeOnSave>();
  @Input() experiencesList: DeveloperProfile['professional_experiences'] | undefined;

  protected isModalOpen: boolean = false;
  protected experiencesFormList: FormGroup[] | undefined;

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
      if (changes['experiencesList'] && changes['experiencesList'].currentValue) {
        if (this.experiencesList) {
          this.updateExperiencesFormsList(this.experiencesList)
        }
      }
    }
  }

  private updateExperiencesFormsList(experiencesList: DeveloperProfileJobExperiences[]) {
    this.experiencesFormList = experiencesList.map(experience =>
      this.createExperienceForm(experience)
    );
  }

  private createExperienceForm(experience: DeveloperProfileJobExperiences): FormGroup {

    const EDIT_MODE: boolean = true;
    const form = this.formService.buildDeveloperJobExperiencesForm(EDIT_MODE);

    form.patchValue({
      ...experience,
      from: this.fromMillisecondsToMonthYearPipe.transform(experience.from),
      to: this.fromMillisecondsToMonthYearPipe.transform(experience.to),
    });

    return form;

  }
  
}