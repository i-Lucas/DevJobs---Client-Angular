import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationsService } from './services/applications.service';

import { SharedModulesModule } from 'app/shared/modules/shared-modules.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

import { RootApplicationsComponent } from './components/root-applications/root-applications.component';
import { ApplicationTimelineComponent } from './components/timeline/application-timeline.component';

import { HiringProcessService } from '../../company/recruitment/services/process/hiring-process.service';

import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TimelineModule } from 'primeng/timeline';
import { FieldsetModule } from 'primeng/fieldset';

const routes: Routes = [
  {
    path: '',
    component: RootApplicationsComponent
  },
  {
    path: ':id',
    component: ApplicationTimelineComponent
  }
]

@NgModule({
  declarations: [
    RootApplicationsComponent,
    ApplicationTimelineComponent
  ],
  providers: [
    ApplicationsService,
    HiringProcessService,
  ],
  imports: [

    TagModule,
    TableModule,
    TooltipModule,
    TimelineModule,
    FieldsetModule,

    CommonModule,
    SharedModulesModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export default class ApplicationsModule { }
