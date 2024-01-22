import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-projects',
  templateUrl: './dev-profile-projects.component.html',
})
export class DevProfileProjectsComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;

  @Output() onSave = new EventEmitter<DeveloperEditModeOnSave>();
  @Input() projectsList: DeveloperProfile['projects'] | undefined;

  protected isModalOpen: boolean = false;
  protected projectsFormList: FormGroup[] | undefined;

  constructor(
    private formService: DeveloperFormService,
    private componentService: CommonComponentService
  ) { }

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.isModalOpen = true
    }
  ]

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOwner) {
      if (changes['projectsList'] && changes['projectsList'].currentValue) {
        if (this.projectsList) {
          this.updateProjectFormsList(this.projectsList)
        }
      }
    }
  }

  protected openNewWindow(path: string) {
    this.componentService.openInNewWindow(path);
  }

  private updateProjectFormsList(projectList: DeveloperProfileProjects[]) {
    this.projectsFormList = projectList.map(project =>
      this.createProjectForm(project)
    );
  }

  private createProjectForm(project: DeveloperProfileProjects): FormGroup {

    const EDIT_MODE: boolean = true;
    const form = this.formService.buildDeveloperProjectsForm(EDIT_MODE);

    form.patchValue(project);
    return form;

  }

}
