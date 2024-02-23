import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModalComponent } from './shared-modal/shared-modal.component';
import { JobOfferPreviewComponent } from './job-offer-preview/job-offer-preview.component';

import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    SharedModalComponent,
    JobOfferPreviewComponent,
  ],
  imports: [
    CommonModule,

    ChipModule,
    ImageModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    DividerModule,
  ],
  exports: [
    SharedModalComponent,
    JobOfferPreviewComponent
  ]
})
export class SharedComponentsModule { }
