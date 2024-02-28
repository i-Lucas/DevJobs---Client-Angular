import { NgModule } from '@angular/core';

import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    TagModule,
    ChipModule,
    BadgeModule,
    ButtonModule,
    TooltipModule,
    DividerModule,
    SkeletonModule,
    CheckboxModule,
    ProgressSpinnerModule
  ]
}) 
export class PrimeModule { }
