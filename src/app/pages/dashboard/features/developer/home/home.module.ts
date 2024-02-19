import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { RootDeveloperHomeComponent } from './components/root-developer-home/root-developer-home.component';

const routes: Routes = [
  {
    path: '',
    component: RootDeveloperHomeComponent
  }
];

@NgModule({
  declarations: [
    RootDeveloperHomeComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule.forChild(routes),
  ]
})
export default class HomeModule { }
