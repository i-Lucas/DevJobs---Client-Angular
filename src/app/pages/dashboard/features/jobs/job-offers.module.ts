import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrimeModule } from './modules/prime.module';

import { RootJobsComponent } from './components/root-offers/root-jobs.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { JobOfferPageComponent } from './components/job-offer-page/job-offer-page.component';

import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

const routes: Routes = [
  {
    path: 'jobs',
    component: RootJobsComponent,
  },
  {
    path: 'jobs/:id',
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
    PrimeModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
})
export default class JobOffersModule { }
