import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module')
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export default class DeveloperModule { }