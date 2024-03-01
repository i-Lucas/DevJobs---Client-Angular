import { NgModule } from '@angular/core';

import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  exports: [
    ChipModule,
    ImageModule,
    ButtonModule,
    TooltipModule,
    DividerModule,
    SkeletonModule,
    PaginatorModule,
  ]
})
export class PrimeModule { }
