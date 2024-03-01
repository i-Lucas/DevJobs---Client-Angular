import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModalComponent } from './shared-modal/shared-modal.component';
import { JobOfferPreviewComponent } from './job-offer-preview/job-offer-preview.component';
import { GlobalLoadingSpinnerComponent } from './global-loading-spinner/global-loading-spinner.component';

import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    SharedModalComponent,
    JobOfferPreviewComponent,
    GlobalLoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,

    ChipModule,
    ImageModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    DividerModule,
    SkeletonModule,
    ProgressSpinnerModule
  ],
  exports: [
    SharedModalComponent,
    JobOfferPreviewComponent,
    GlobalLoadingSpinnerComponent
  ]
})
export class SharedComponentsModule { }
