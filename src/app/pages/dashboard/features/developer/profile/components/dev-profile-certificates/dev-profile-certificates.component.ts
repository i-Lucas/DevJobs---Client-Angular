import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperProfileService } from '../../services/developer-profile.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-certificates',
  templateUrl: './dev-profile-certificates.component.html',
})
export class DevProfileCertificatesComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;
  @Input() certificatesList: DeveloperProfile['certificates'] | undefined;

  @Output() onAdd = new EventEmitter<RequestDeveloperProfileAdd<any>>();
  @Output() onEdit = new EventEmitter<RequestDeveloperProfileUpdate<any>>();
  @Output() onDelete = new EventEmitter<RequestDeveloperProfileDelete<any>>();

  private identifier: DeveloperProfileEditFieldsIdentifier = 'DEVELOPER_CERTIFICATES'

  protected editLoading: boolean = false;
  protected isModalOpen: boolean = false;
  protected certificatesFormList: FormGroup[] | undefined;

  protected addingNewField: boolean = false;
  protected newFieldForm: FormGroup | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: DeveloperFormService,
    private componentService: CommonComponentService,
    private developerProfileService: DeveloperProfileService,
  ) { }

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
    this.certificatesFormList = certificatesList.map(certificate => {

      const EDIT_MODE: boolean = true;
      const form = this.formService.buildDeveloperCertificatesForm(EDIT_MODE);

      form.patchValue(certificate);
      return form;

    })

  }

  protected onCloseModal() {
    this.isModalOpen = false
    this.addingNewField = false
    this.newFieldForm = undefined
  }

  protected onAdding() {
    this.isModalOpen = true
    this.addingNewField = true
    this.newFieldForm = this.formService.buildDeveloperCertificatesForm();
  }

  protected addNewField(form: FormGroup) {

    this.editLoading = true

    const body = { ...form.value }
    body.workload = body.workload.concat(' ', body.workload_tmp);
    delete body.workload_tmp;

    this.onAdd.emit({
      data: body, identifier: this.identifier,
      onSuccess: (response) => {

        this.editLoading = false
        this.newFieldForm?.reset();

        this.developerProfileService.addDeveloperProfileCertificateToList(response.data);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    })
  }

  protected updateCertificate(form: FormGroup) {

    const body = { ...form.value }
    body.workload = body.workload.concat(' ', body.workload_tmp);
    delete body.workload_tmp;

    this.editLoading = true

    this.onEdit.emit({
      data: body,
      identifier: this.identifier,
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperProfileCertificates(body);
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
      this.deleteCertificate(id);
    });
  };

  protected deleteCertificate(id: string) {

    this.editLoading = true

    this.onDelete.emit({
      body: { id, identifier: this.identifier },
      onError: (error) => {
        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      },
      onSuccess: (response) => {
        this.editLoading = false
        this.removeFormFromList(id);
        this.developerProfileService.deleteDeveloperProfileCertificate(id);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      }
    })
  }

  private removeFormFromList(id: string) {
    if (this.certificatesFormList) {
      this.certificatesFormList = this.certificatesFormList.filter(form => form.value.id !== id);
      this.cdr.detectChanges();
    }
  }

}