import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-preview-education',
  templateUrl: './preview-education.component.html',
})
export class PreviewEducationComponent {

  @Input() academicEducationList: DeveloperProfileAcademicEducation[] = [];

  @Output() editClick = new EventEmitter<DevSignupFormPreviewEvent>();
  @Output() deleteClick = new EventEmitter<DevSignupFormPreviewEvent>();

  protected onEditClick(item: DeveloperProfileAcademicEducation) {
    this.editClick.emit({
      identifier: 'ACADEMIC_EDUCATION',
      item
    });
  }

  protected onDeleteClick(item: DeveloperProfileAcademicEducation) {
    this.deleteClick.emit({
      identifier: 'ACADEMIC_EDUCATION',
      item
    });
  }

}