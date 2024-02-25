import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MessageService } from './services/message.service';

import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';

import { MessageListComponent } from './components/message-list/message-list.component';
import { RootMessagesComponent } from './components/root-messages/root-messages.component';
import { MessageContentComponent } from './components/message-content/message-content.component';
import { SkeletonModule } from 'primeng/skeleton';

// /dashboard/notifications
const routes: Routes = [
  {
    path: '',
    component: RootMessagesComponent,
    children: [
      {
        path: ':id',
        component: MessageContentComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    MessageListComponent,
    RootMessagesComponent,
    MessageContentComponent,
  ],
  providers: [
    MessageService
  ],
  imports: [
    CommonModule,

    TagModule,
    DividerModule,
    SkeletonModule,
    CheckboxModule,

    RouterModule.forChild(routes)
  ]
})
export default class MessagesModule { }
