import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-developer-job-experiences-form',
  templateUrl: './developer-job-experiences-form.component.html',
})
export class DeveloperJobExperiencesFormComponent {

  @Input() jobExperiencesForm: FormGroup | undefined;

}
