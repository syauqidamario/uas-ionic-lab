import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocPage } from './loc.page';

const routes: Routes = [
  {
    path: '',
    component: LocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocPageRoutingModule {}
