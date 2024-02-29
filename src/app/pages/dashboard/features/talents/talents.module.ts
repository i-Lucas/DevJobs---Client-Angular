import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

import { TalentsService } from './services/talents.service';

import { RootTalentsComponent } from './components/root-talents/root-talents.component';
import { TalentPreviewComponent } from './components/preview/talent-preview.component';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: RootTalentsComponent
  }
]

@NgModule({
  exports: [
    ChipModule,
    ImageModule,
    ButtonModule,
    DividerModule,
    TooltipModule,
  ],
})
export class PrimeModule { }

@NgModule({
  declarations: [
    RootTalentsComponent,
    TalentPreviewComponent
  ],
  providers: [
    TalentsService
  ],
  imports: [
    PrimeModule,
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export default class TalentsModule { }
