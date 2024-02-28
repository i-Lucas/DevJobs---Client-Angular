import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent implements OnDestroy {

  @Input() isOpen: boolean = false;
  @Output() onHide = new EventEmitter<void>();
  @Input() unreadMessagesCount: number | undefined;

  protected destroy$ = new Subject<void>();
  protected sidebarList: SidebarListOptions[] = []

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.getSidebarList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.sidebarList = list)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}