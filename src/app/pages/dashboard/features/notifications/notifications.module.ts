import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
  ;import { FormsModule } from '@angular/forms';

import { PrimeModule } from './modules/prime.module';

import { SharedModulesModule } from 'app/shared/modules/shared-modules.module';

import { RootNotificationsComponent } from './components/root-notifications/root-notifications.component';
import { MessageBodyComponent } from './components/message-body/message-body.component';

const routes: Routes = [
  {
    path: '',
    component: RootNotificationsComponent,
  }
];

@NgModule({
  declarations: [
    MessageBodyComponent,
    RootNotificationsComponent,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FormsModule,
    SharedModulesModule,
    RouterModule.forChild(routes)
  ]
})
export default class NotificationsModule { }