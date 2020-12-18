import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocPageRoutingModule } from './loc-routing.module';

import { LocPage } from './loc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocPageRoutingModule
  ],
  declarations: [LocPage]
})
export class LocPageModule {}
