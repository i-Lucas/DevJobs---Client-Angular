import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module')
  },
  {
    path:'applications',
    loadChildren: () => import('./applications/applications.module')
  },
  {
    path: '**',
    redirectTo: '/dashboard/developer/home'
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