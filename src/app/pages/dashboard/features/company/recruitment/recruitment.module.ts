import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RootRecruitmentComponent } from './components/root-recruitment/root-recruitment.component';

const routes: Routes = [
  {
    path: '',
    component: RootRecruitmentComponent
  }
]

@NgModule({
  declarations: [
    RootRecruitmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export default class RecruitmentModule { }