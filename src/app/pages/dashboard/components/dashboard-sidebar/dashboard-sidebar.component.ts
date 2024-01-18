import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {

  @Input() isOpen: boolean = false;
  @Output() onHide = new EventEmitter<void>()

}
