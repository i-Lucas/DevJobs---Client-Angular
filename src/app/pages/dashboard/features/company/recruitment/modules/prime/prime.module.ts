import { NgModule } from '@angular/core';

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
})
export class PrimeModule { }
