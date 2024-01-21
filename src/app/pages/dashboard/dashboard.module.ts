import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app-guards/auth.guard';
import { SidebarService } from './services/sidebar.service';
import { DashboardService } from './services/dashboard.service';

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
    ]
  },
];

@NgModule({
  imports: [
    AvatarModule,
    ButtonModule,
    SidebarModule,
    SkeletonModule,
    InputTextModule,
    TieredMenuModule,
    ProgressBarModule,
  ],
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
    DashboardHeaderComponent,
    DashboardRootComponent,
    DashboardSidebarComponent
  ],
  providers: [
    AuthGuard,
    SidebarService,
    DashboardService,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild(routes)
  ]
})
export default class DashboardModule { }
