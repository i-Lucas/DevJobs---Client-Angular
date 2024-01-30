import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TagModule } from 'primeng/tag';
import { ChipsModule } from 'primeng/chips';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { HiringListService } from './services/hiring-list.service';
import { NewRecruitmentService } from './services/new-recruitment.service';

import { ManageProcessComponent } from './components/manage-process/manage-process.component';
import { RootRecruitmentComponent } from './components/root-recruitment/root-recruitment.component';
import { NewHiringProcessComponent } from './components/new-hiring-process/new-hiring-process.component';

import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { SharedModulesModule } from 'app/shared/modules/shared-modules.module';

const routes: Routes = [
  {
    path: '',
    component: RootRecruitmentComponent
  },
  {
    path: ':id',
    component: ManageProcessComponent
  }
]

@NgModule({
  declarations: [
    RootRecruitmentComponent,
    NewHiringProcessComponent,
    ManageProcessComponent
  ],
  providers: [
    NewRecruitmentService,
    HiringListService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModulesModule,
    SharedComponentsModule,

    TagModule,
    ChipsModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DividerModule,
    TooltipModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    KeyFilterModule,
    InputTextModule,
    InputSwitchModule,
    InputNumberModule,
    SelectButtonModule,
    InputTextareaModule,

    RouterModule.forChild(routes)
  ]
})
export default class RecruitmentModule { }