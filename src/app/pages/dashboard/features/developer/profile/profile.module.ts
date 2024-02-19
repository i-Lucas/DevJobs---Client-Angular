import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedFormsModule } from '@app-shared-forms/shared-forms.module';
import { DeveloperProfileService } from './services/developer-profile.service';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { SharedModulesModule } from "../../../../../shared/modules/shared-modules.module";
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

import { DevNewFieldBtnComponent } from './components/dev-new-field-btn/dev-new-field-btn.component';
import { DevProfilePanelComponent } from './components/dev-profile-panel/dev-profile-panel.component';
import { DevProfileAboutComponent } from './components/dev-profile-about/dev-profile-about.component';
import { DevSaveDeleteBtnComponent } from './components/dev-save-delete-btn/dev-save-delete-btn.component';
import { DevProfileProjectsComponent } from './components/dev-profile-projects/dev-profile-projects.component';
import { DevProfileStacklistComponent } from './components/dev-profile-stacklist/dev-profile-stacklist.component';
import { DevProfileLanguagesComponent } from './components/dev-profile-languages/dev-profile-languages.component';
import { DevProfileEducationComponent } from './components/dev-profile-education/dev-profile-education.component';
import { RootDeveloperProfileComponent } from './components/root-developer-profile/root-developer-profile.component';
import { DevProfileExperiencesComponent } from './components/dev-profile-experiences/dev-profile-experiences.component';
import { DevProfileCertificatesComponent } from './components/dev-profile-certificates/dev-profile-certificates.component';

const routes: Routes = [
  {
    path: '',
    component: RootDeveloperProfileComponent
  }
];

@NgModule({
  exports: [
    TagModule,
    ChipModule,
    MenuModule,
    PanelModule,
    RatingModule,
    ImageModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    SkeletonModule,
  ],
})
export class PrimeModule { }

@NgModule({
  providers: [
    DeveloperFormService,
    DeveloperProfileService
  ],
  declarations: [
    DevNewFieldBtnComponent,
    DevProfileAboutComponent,
    DevProfilePanelComponent,
    DevSaveDeleteBtnComponent,
    DevProfileProjectsComponent,
    DevProfileStacklistComponent,
    DevProfileEducationComponent,
    DevProfileLanguagesComponent,
    RootDeveloperProfileComponent,
    DevProfileExperiencesComponent,
    DevProfileCertificatesComponent,
  ],
  imports: [
    FormsModule,
    PrimeModule,
    CommonModule,
    SharedFormsModule,
    SharedModulesModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
  ]
})
export default class ProfileModule { }
