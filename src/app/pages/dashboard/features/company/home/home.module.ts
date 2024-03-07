import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RootHomeComponent } from './components/root-home/root-home.component';

const routes: Routes = [
  {
    path: '',
    component: RootHomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export default class HomeModule { }
