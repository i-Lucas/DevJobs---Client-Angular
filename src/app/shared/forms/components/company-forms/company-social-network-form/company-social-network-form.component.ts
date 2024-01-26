import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-social-network-form',
  templateUrl: './company-social-network-form.component.html',
})
export class CompanySocialNetworkFormComponent {

  @Input() socialNetworkForm: FormGroup  | undefined;

}