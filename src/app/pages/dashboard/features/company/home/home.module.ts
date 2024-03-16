import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RootHomeComponent } from './components/root-home/root-home.component';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';

const routes: Routes = [
  {
    path: '',
    component: RootHomeComponent
  }
]

@NgModule({
  declarations: [
    RootHomeComponent,
  ],
  imports: [
    CommonModule,

    ChartModule,
    TooltipModule,
    DividerModule,

    SharedComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export default class HomeModule { }
