import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'job-experience-form-preview',
  templateUrl: './job-experience.component.html',
})
export class JobExperienceComponent {

  @Input() loading: boolean = false;
  @Input() jobExperiencesList: DeveloperProfileJobExperiences[] = []

  @Output() onChange = new EventEmitter<DevSignupFormPreviewEvent>()

  protected onAction(
    option: DevSignupFormPreviewEvent['option'],
    item: DeveloperProfileJobExperiences
  ) {

    this.onChange.emit({
      identifier: 'JOB_EXPERIENCES',
      option,
      item
    });
  }

}