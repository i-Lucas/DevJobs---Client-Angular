import { NgModule } from '@angular/core';

import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  exports: [
    BadgeModule,
    AvatarModule,
    ButtonModule,
    SidebarModule,
    SkeletonModule,
    InputTextModule,
    TieredMenuModule,
    ProgressBarModule,
  ]
})
export class PrimeModule { }