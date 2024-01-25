import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { RootDeveloperHomeComponent } from './components/root-developer-home/root-developer-home.component';

@NgModule({
  declarations: [
    RootDeveloperHomeComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: RootDeveloperHomeComponent
      }
    ]),
  ]
})
export default class HomeModule { }
