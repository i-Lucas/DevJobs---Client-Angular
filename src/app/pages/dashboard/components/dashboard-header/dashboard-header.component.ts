import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent {

  @Input() loading: boolean = false;
  @Input() props: DashboardHeaderProps | null = null;

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Conta',
      disabled: true,
      icon: 'pi pi-fw pi-user',
    },
    {
      disabled: true,
      label: 'Configurações',
      icon: 'pi pi-wrench',
    },
    {
      disabled: true,
      label: 'Opções',
      icon: 'pi pi-fw pi-pencil',
    },
    {
      label: 'Sair',
      icon: 'pi pi-times',
      command: () => this.loggout()
    }
  ];

  @Output() onAction = new EventEmitter<DashboardHeaderEvents>();

  protected toggleSidebar() {
    this.onAction.emit({
      action: 'TOGGLE_SIDEBAR'
    })
  }

  protected changeTheme() {
    this.onAction.emit({
      action: 'CHANGE_THEME'
    })
  }

  private loggout() {
    this.onAction.emit({
      action: 'LOGOUT'
    })
  }

}