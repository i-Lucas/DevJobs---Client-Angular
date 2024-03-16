import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeModule } from './modules/prime/prime.module';

import { HiringProcessService } from './services/process/hiring-process.service';
import { HiringProcessFormService } from './services/form/new-process.form.service';

import { ManageProcessComponent } from './components/manage-process/manage-process.component';
import { RootRecruitmentComponent } from './components/root-recruitment/root-recruitment.component';
import { NewHiringProcessComponent } from './components/new-hiring-process/new-hiring-process.component';

import { SharedModulesModule } from 'app/shared/modules/shared-modules.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { ProcessStepsComponent } from './components/process-steps/process-steps.component';
import { ProcessTablesListComponent } from './components/process-tables-list/process-tables-list.component';
import { ProcessControlPanelComponent } from './components/process-control-panel/process-control-panel.component';

const routes: Routes = [
  {
    path: '',
    component: RootRecruitmentComponent
  },
  {
    path: ':id',
    component: ManageProcessComponent,
    canDeactivate: [(component: ManageProcessComponent) => !component.canNavigate()],
  }
]

@NgModule({
  declarations: [
    ProcessStepsComponent,
    ManageProcessComponent,
    RootRecruitmentComponent,
    NewHiringProcessComponent,
    ProcessTablesListComponent,
    ProcessControlPanelComponent,
  ],
  providers: [
    HiringProcessService,
    HiringProcessFormService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    DragDropModule,
    ReactiveFormsModule,
    SharedModulesModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export default class RecruitmentModule { }