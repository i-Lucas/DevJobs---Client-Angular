import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-developer-about-form',
  templateUrl: './developer-about-form.component.html',
})
export class DeveloperAboutFormComponent {

  @Input() aboutForm: FormGroup | undefined;
}
