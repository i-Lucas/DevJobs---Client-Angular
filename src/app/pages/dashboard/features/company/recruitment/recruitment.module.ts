import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ChipsModule } from 'primeng/chips';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

import { HiringListService } from './services/hiring-list.service';
import { NewRecruitmentFormService } from './services/new-recruitment.service';

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
    component: ManageProcessComponent,
    canDeactivate: [(component: ManageProcessComponent) => !component.canNavigate()],
  }
]

@NgModule({
  declarations: [
    ManageProcessComponent,
    RootRecruitmentComponent,
    NewHiringProcessComponent,
  ],
  providers: [
    NewRecruitmentFormService,
    HiringListService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModulesModule,
    SharedComponentsModule,

    DragDropModule,

    TagModule,
    MenuModule,
    ChipsModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DividerModule,
    TooltipModule,
    TabViewModule,
    DropdownModule,
    FieldsetModule,
    AccordionModule,
    CalendarModule,
    KeyFilterModule,
    InputTextModule,
    InputSwitchModule,
    InputNumberModule,
    SelectButtonModule,
    InputTextareaModule,

    AvatarModule,
    AvatarGroupModule,

    RouterModule.forChild(routes)
  ]
})
export default class RecruitmentModule { }