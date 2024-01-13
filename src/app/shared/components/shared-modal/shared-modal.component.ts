import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
})
export class SharedModalComponent {

  @Input() isOpen: boolean = true

}
