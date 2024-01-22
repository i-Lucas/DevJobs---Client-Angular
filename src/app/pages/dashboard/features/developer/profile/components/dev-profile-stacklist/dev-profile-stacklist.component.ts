import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-stacklist',
  templateUrl: './dev-profile-stacklist.component.html',
})
export class DevProfileStacklistComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;

  @Output() onSave = new EventEmitter<DeveloperEditModeOnSave>();
  @Input() stackList: DeveloperProfile['stack'] | undefined;

  protected isModalOpen: boolean = false;
  protected stackFormList: FormGroup[] | undefined;

  constructor(private formService: DeveloperFormService) { }

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.isModalOpen = true
    }
  ]

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOwner) {
      if (changes['stackList'] && changes['stackList'].currentValue) {
        if (this.stackList) {
          this.updateStackFormsList(this.stackList)
        }
      }
    }
  }

  private updateStackFormsList(stackList: DeveloperProfileStackList[]) {
    this.stackFormList = stackList.map(stack =>
      this.createStackListForm(stack)
    );
  }

  private createStackListForm(stack: DeveloperProfileStackList): FormGroup {

    const EDIT_MODE: boolean = true;
    const form = this.formService.buildDeveloperStacklistForm(EDIT_MODE);

    form.patchValue(stack);
    return form;

  }

}

