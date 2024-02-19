import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';

import { SharedFormsModule } from '@app-shared-forms/shared-forms.module';
import { CompanyProfileService } from './services/company-profile.service';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

import { SharedModulesModule } from 'app/shared/modules/shared-modules.module';
import { EditModeComponent } from './components/edit-mode/edit-mode.component';
import { LeftColumnComponent } from './components/left-column/left-column.component';
import { RightColumnComponent } from './components/right-column/right-column.component';
import { RootCompanyProfileComponent } from './components/root-company-profile/root-company-profile.component';

const routes: Routes = [
  {
    path: '',
    component: RootCompanyProfileComponent
  }
]

@NgModule({
  exports: [
    BadgeModule,
    ImageModule,
    ButtonModule,
    TooltipModule,
    TabViewModule,
    DividerModule,
    SkeletonModule,
  ],
})
export class PrimeModule { }

@NgModule({
  providers: [
    CompanyProfileService
  ],
  declarations: [
    EditModeComponent,
    LeftColumnComponent,
    RightColumnComponent,
    RootCompanyProfileComponent,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    SharedFormsModule,
    SharedModulesModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
})
export default class ProfileModule { }
