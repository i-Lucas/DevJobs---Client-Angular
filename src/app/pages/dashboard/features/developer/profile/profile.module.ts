import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RootDeveloperProfileComponent } from './components/root-developer-profile/root-developer-profile.component';

@NgModule({
  declarations: [
    RootDeveloperProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RootDeveloperProfileComponent
      }
    ])
  ]
})
export default class ProfileModule { }
