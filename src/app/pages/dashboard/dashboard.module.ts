import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app-guards/auth.guard';
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
  }
]

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardRootComponent,
    DashboardSidebarComponent
  ],
  providers: [
    DashboardService,
    AuthGuard
  ],
  imports: [
    CommonModule,

    ProgressBarModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule,
    AvatarModule,
    // AvatarGroupModule,
    TieredMenuModule,

    RouterModule.forChild(routes)
  ]
})
export default class DashboardModule { }
