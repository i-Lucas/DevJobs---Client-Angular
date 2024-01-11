import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-preview-certificates',
  templateUrl: './preview-certificates.component.html',
})
export class PreviewCertificatesComponent {

  @Input() certificatesList: DeveloperProfileCertificates[] = [];

  @Output() editClick = new EventEmitter<DevSignupFormPreviewEvent>();
  @Output() deleteClick = new EventEmitter<DevSignupFormPreviewEvent>();

  protected onEditClick(item: DeveloperProfileCertificates) {
    this.editClick.emit({
      identifier: 'CERTIFICATES',
      item
    });
  }

  protected onDeleteClick(item: DeveloperProfileCertificates) {
    this.deleteClick.emit({
      identifier: 'CERTIFICATES',
      item
    });
  }

}
