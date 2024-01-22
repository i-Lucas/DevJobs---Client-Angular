import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-profile-panel',
  templateUrl: './dev-profile-panel.component.html',
})
export class DevProfilePanelComponent {

  @Input() isOwner: boolean = false;
  @Input() loading: boolean = false;
  
  @Output() onEdit = new EventEmitter<void>();
  
  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.onEdit.emit()
    }
  ]

}
