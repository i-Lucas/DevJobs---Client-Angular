import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OverviewRootComponent } from './container/overview-root.component';
import { OverviewHeaderComponent } from './components/overview-header/overview-header.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewRootComponent
  }
];

@NgModule({
  declarations: [
    OverviewRootComponent,
    OverviewHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export default class OverviewModule { }
