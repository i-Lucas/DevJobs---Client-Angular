import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
// import { PaginatorModule } from 'primeng/paginator';

import { RootJobsComponent } from './components/root-offers/root-jobs.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { JobOfferPageComponent } from './components/job-offer-page/job-offer-page.component';

import { JobOfferService } from './services/job-offer.service';

const routes: Routes = [
  {
    path: '',
    component: RootJobsComponent
  },
  {
    path: ':id',
    component: JobOfferPageComponent
  }
]

@NgModule({
  declarations: [
    RootJobsComponent,
    SearchPanelComponent,
    JobOfferPageComponent
  ],
  imports: [
    CommonModule,

    ChipModule,
    ImageModule,
    ButtonModule,
    TooltipModule,
    DividerModule,
    // PaginatorModule,

    RouterModule.forChild(routes)
  ],
  providers: [
    JobOfferService
  ]
})
export default class JobOffersModule { }
