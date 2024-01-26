import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'company-profile-right-column',
  templateUrl: './right-column.component.html',
})
export class RightColumnComponent {

  @Input() profile: CompanyProfile | undefined;
  @Input() enableEditingMode: boolean = false;

  @Output() clickEdit = new EventEmitter<void>()
  @Output() openWindow = new EventEmitter<string>()

}
