import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModalComponent } from './shared-modal/shared-modal.component';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    SharedModalComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,
    DialogModule,
    DividerModule,
  ],
  exports: [
    SharedModalComponent
  ]
})
export class SharedComponentsModule { }
