import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OverviewRootComponent } from './container/overview-root.component';
import { OverviewHeaderComponent } from './components/overview-header/overview-header.component';

@NgModule({
  declarations: [
    OverviewRootComponent,
    OverviewHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewRootComponent
      }
    ])
  ]
})
export default class OverviewModule { }
