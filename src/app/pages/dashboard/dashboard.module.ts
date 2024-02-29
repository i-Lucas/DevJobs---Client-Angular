import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app-guards/auth.guard';
import { PrimeModule } from './modules/prime.module';
import { SidebarService } from './services/sidebar.service';

import { DashboardRootComponent } from './components/dashboard-root/dashboard-root.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'company',
        loadChildren: () => import('./features/company/company.module')
      },
      {
        path: 'hiring',
        loadChildren: () => import('./features/jobs/job-offers.module')
      },
      {
        path: 'talents',
        loadChildren: () => import('./features/talents/talents.module')
      },
      {
        path: 'developer',
        loadChildren: () => import('./features/developer/developer.module')
      },
      {
        path: 'notifications',
        loadChildren: () => import('./features/notifications/notifications.module')
      },
    ]
  },
];

@NgModule({
  declarations: [
    DashboardRootComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent
  ],
  providers: [
    AuthGuard,
    SidebarService
  ],
  imports: [
    PrimeModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export default class DashboardModule { }
