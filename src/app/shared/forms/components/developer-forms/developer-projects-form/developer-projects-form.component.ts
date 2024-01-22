import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-developer-projects-form',
  templateUrl: './developer-projects-form.component.html',
})
export class DeveloperProjectsFormComponent {

  @Input() projectsForm: FormGroup | undefined;
}
