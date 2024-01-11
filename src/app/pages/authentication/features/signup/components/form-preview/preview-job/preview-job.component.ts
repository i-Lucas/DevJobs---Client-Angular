import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-preview-job',
  templateUrl: './preview-job.component.html',
})
export class PreviewJobComponent {

  @Input() jobExperiencesList: DeveloperProfileJobExperiences[] = [];

  @Output() editClick = new EventEmitter<DevSignupFormPreviewEvent>();
  @Output() deleteClick = new EventEmitter<DevSignupFormPreviewEvent>();

  protected onEditClick(item: DeveloperProfileJobExperiences) {
    this.editClick.emit({
      identifier: 'JOB_EXPERIENCES',
      item
    });
  }

  protected onDeleteClick(item: DeveloperProfileJobExperiences) {
    this.deleteClick.emit({
      identifier: 'JOB_EXPERIENCES',
      item
    });
  }
}
