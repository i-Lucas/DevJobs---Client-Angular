import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app-guards/auth.guard';
import { SidebarService } from './services/sidebar.service';

import { DashboardRootComponent } from './components/dashboard-root/dashboard-root.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ProgressBarModule } from 'primeng/progressbar';

const routes: Routes = [
  {
    path: '',
    component: DashboardRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'developer',
        loadChildren: () => import('./features/developer/developer.module')
      },
      {
        path: 'company',
        loadChildren: () => import('./features/company/company.module')
      },
      {
        path: 'hiring',
        loadChildren: () => import('./features/jobs/job-offers.module')
      },
      {
        path: 'notifications',
        loadChildren: () => import('./features/messages/messages.module')
      }
    ]
  },
];

@NgModule({
  exports: [
    AvatarModule,
    ButtonModule,
    SidebarModule,
    SkeletonModule,
    InputTextModule,
    TieredMenuModule,
    ProgressBarModule,
  ]
})
export class PrimeModule { }

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
    CommonModule,
    PrimeModule,
    RouterModule.forChild(routes)
  ]
})
export default class DashboardModule { }
