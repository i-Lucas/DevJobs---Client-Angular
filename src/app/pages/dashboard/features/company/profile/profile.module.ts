import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RootCompanyProfileComponent } from './components/root-company-profile/root-company-profile.component';

@NgModule({
  declarations: [
    RootCompanyProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RootCompanyProfileComponent
      }
    ])
  ]
})
export default class ProfileModule { }
