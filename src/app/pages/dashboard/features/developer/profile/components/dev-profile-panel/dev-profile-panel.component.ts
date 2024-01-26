import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-profile-panel',
  templateUrl: './dev-profile-panel.component.html',
})
export class DevProfilePanelComponent {

  @Input() isOwner: boolean = false;
  @Input() loading: boolean = false;

  @Input() icon: string | undefined;
  @Input() label: string | undefined;

  @Output() onEdit = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<void>();

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.onEdit.emit()
    },
    {
      label: 'Novo', icon: 'pi pi-plus',
      command: () => this.onAdd.emit()
    }
  ]

}
