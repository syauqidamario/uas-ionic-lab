import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddfriendsPage } from './addfriends.page';

const routes: Routes = [
  {
    path: '',
    component: AddfriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddfriendsPageRoutingModule {}
