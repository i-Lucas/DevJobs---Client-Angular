import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-academic-form-preview',
  templateUrl: './academic-education.component.html',
})
export class AcademicEducationComponent {

  @Input() loading: boolean = false;
  @Input() academicEducationList: DeveloperProfileAcademicEducation[] = []

  @Output() onChange = new EventEmitter<DevSignupFormPreviewEvent>()

  protected onAction(
    option: DevSignupFormPreviewEvent['option'],
    item: DeveloperProfileAcademicEducation
  ) {

    this.onChange.emit({
      identifier: 'ACADEMIC_EDUCATION',
      option,
      item
    });
  }

}