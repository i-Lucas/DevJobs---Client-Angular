import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperProfileService } from '../../services/developer-profile.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-projects',
  templateUrl: './dev-profile-projects.component.html',
})
export class DevProfileProjectsComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;
  @Input() projectsList: DeveloperProfile['projects'] | undefined;

  @Output() onEdit = new EventEmitter<RequestDeveloperProfileUpdate<any>>();
  @Output() onDelete = new EventEmitter<RequestDeveloperProfileDelete<any>>();

  protected isModalOpen: boolean = false;
  protected editLoading: boolean = false;
  protected projectsFormList: FormGroup[] | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: DeveloperFormService,
    private componentService: CommonComponentService,
    private developerProfileService: DeveloperProfileService,
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

  protected updateProject(form: FormGroup) {

    this.editLoading = true

    this.onEdit.emit({
      data: form.value,
      identifier: 'DEVELOPER_PROJECTS',
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperProfileProjects(form.value);
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
      this.deleteProject(id);
    });
  };

  protected deleteProject(id: string) {

    this.editLoading = true

    this.onDelete.emit({
      body: { id, identifier: 'DEVELOPER_PROJECTS' },
      onError: (error) => {
        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      },
      onSuccess: (response) => {
        this.editLoading = false
        this.removeFormFromList(id);
        this.developerProfileService.deleteDeveloperProfileProject(id);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      }
    })
  }

  private removeFormFromList(id: string) {
    if (this.projectsFormList) {
      this.projectsFormList = this.projectsFormList.filter(form => form.value.id !== id);
      this.cdr.detectChanges();
    }
  }

}