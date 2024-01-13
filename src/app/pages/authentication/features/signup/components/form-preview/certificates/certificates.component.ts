import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'certificates-form-preview',
  templateUrl: './certificates.component.html',
})
export class CertificatesComponent {

  @Input() loading: boolean = false;
  @Input() certificatesList: DeveloperProfileCertificates[] = [];

  @Output() onChange = new EventEmitter<DevSignupFormPreviewEvent>()

  protected onAction(
    option: DevSignupFormPreviewEvent['option'],
    item: DeveloperProfileCertificates
  ) {

    this.onChange.emit({
      identifier: 'CERTIFICATES',
      option,
      item
    });
  }
}