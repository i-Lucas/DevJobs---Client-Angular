import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'dev-preview-projects',
  templateUrl: './preview-projects.component.html',
})
export class PreviewProjectsComponent extends BaseComponentService {

  @Input() projectsList: DeveloperProfileProjects[] = [];

  @Output() editClick = new EventEmitter<DevSignupFormPreviewEvent>();
  @Output() deleteClick = new EventEmitter<DevSignupFormPreviewEvent>();

  protected onEditClick(item: DeveloperProfileProjects) {
    this.editClick.emit({
      identifier: 'PROJECTS',
      item
    });
  }

  protected onDeleteClick(item: DeveloperProfileProjects) {
    this.deleteClick.emit({
      identifier: 'PROJECTS',
      item
    });
  }

}