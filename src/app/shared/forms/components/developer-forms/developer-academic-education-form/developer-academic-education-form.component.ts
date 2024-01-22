import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-academic-education-form',
  templateUrl: './developer-academic-education-form.component.html',
})
export class DeveloperAcademicEducationFormComponent {

  @Input() academicEducationForm: FormGroup | undefined;

  protected courseTypes: DropdownOptionsList[] = this.devFormService.getDeveloperProfileCourseTypes();
  protected courseStatus: DropdownOptionsList[] = this.devFormService.getDeveloperProfileCourseStatus();
  protected courseModality: DropdownOptionsList[] = this.devFormService.getDeveloperProfileCourseModality();

  constructor(private devFormService: DeveloperFormService) { }
}
