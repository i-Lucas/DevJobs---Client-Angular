import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-certificates',
  templateUrl: './dev-profile-certificates.component.html',
})
export class DevProfileCertificatesComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;

  @Output() onSave = new EventEmitter<DeveloperEditModeOnSave>();
  @Input() certificatesList: DeveloperProfile['certificates'] | undefined;

  protected isModalOpen: boolean = false;
  protected certificatesFormList: FormGroup[] | undefined;

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
      if (changes['certificatesList'] && changes['certificatesList'].currentValue) {
        if (this.certificatesList) {
          this.updateCertificatesFormsList(this.certificatesList)
        }
      }
    }
  }

  protected openNewWindow(path: string) {
    this.componentService.openInNewWindow(path);
  }

  private updateCertificatesFormsList(certificatesList: DeveloperProfileCertificates[]) {
    this.certificatesFormList = certificatesList.map(certificate =>
      this.createCertificateForm(certificate)
    );
  }

  private createCertificateForm(certificate: DeveloperProfileCertificates): FormGroup {

    const EDIT_MODE: boolean = true;
    const form = this.formService.buildDeveloperCertificatesForm(EDIT_MODE);

    form.patchValue(certificate);
    return form;

  }

}