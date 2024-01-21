import { Component, Input } from '@angular/core';

@Component({
  selector: 'company-profile-left-column',
  templateUrl: './left-column.component.html',
})
export class LeftColumnComponent {

  @Input() currentProfile: CompanyProfile | undefined
}
