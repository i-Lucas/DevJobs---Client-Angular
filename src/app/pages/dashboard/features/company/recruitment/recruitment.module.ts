import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ChipsModule } from 'primeng/chips';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
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
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
  exports: [
    TagModule,
    MenuModule,
    ChipsModule,
    PanelModule,
    TableModule,
    AvatarModule,
    ButtonModule,
    DividerModule,
    TooltipModule,
    TabViewModule,
    DropdownModule,
    FieldsetModule,
    AccordionModule,
    CalendarModule,
    InputTextModule,
    KeyFilterModule,
    InputSwitchModule,
    AvatarGroupModule,
    InputNumberModule,
    SelectButtonModule,
    InputTextareaModule,
    ProgressSpinnerModule
  ]
}) export class PrimeModule { }

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