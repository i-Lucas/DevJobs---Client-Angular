import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RootApplicationsComponent } from './components/root-applications/root-applications.component';

const routes: Routes = [
  {
    path: '',
    component: RootApplicationsComponent
  }
]

@NgModule({
  declarations: [
    RootApplicationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export default class ApplicationsModule { }
