import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'projects-form-preview',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {

  @Input() loading: boolean = false;
  @Input() projectsList: DeveloperProfileProjects[] = []

  @Output() onChange = new EventEmitter<DevSignupFormPreviewEvent>()

  protected onAction(
    option: DevSignupFormPreviewEvent['option'],
    item: DeveloperProfileProjects
  ) {

    this.onChange.emit({
      identifier: 'PROJECTS',
      option,
      item
    });
  }

  protected openNewWindow(url: string) {
    window.open('https://' + url, "_blank");
  }

}