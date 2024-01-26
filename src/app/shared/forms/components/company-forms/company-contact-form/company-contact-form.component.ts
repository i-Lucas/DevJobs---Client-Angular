import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-contact-form',
  templateUrl: './company-contact-form.component.html',
})
export class CompanyContactFormComponent {

  @Input() contactForm: FormGroup | undefined

}
