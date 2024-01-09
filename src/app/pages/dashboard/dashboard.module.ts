import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';

import { DashboardRootComponent } from './components/dashboard-root/dashboard-root.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardRootComponent,
    DashboardSidebarComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardRootComponent
      }
    ])
  ]
})
export default class DashboardModule { }
