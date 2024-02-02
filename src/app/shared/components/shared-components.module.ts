import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModalComponent } from './shared-modal/shared-modal.component';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { UnsavedChangesAlertComponent } from './unsaved-changes-alert/unsaved-changes-alert.component';

@NgModule({
  declarations: [
    SharedModalComponent,
    UnsavedChangesAlertComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,
    DialogModule,
    DividerModule,
  ],
  exports: [
    SharedModalComponent,
    UnsavedChangesAlertComponent
  ]
})
export class SharedComponentsModule { }
