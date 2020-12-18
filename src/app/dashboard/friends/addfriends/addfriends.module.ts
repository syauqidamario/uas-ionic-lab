import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddfriendsPageRoutingModule } from './addfriends-routing.module';

import { AddfriendsPage } from './addfriends.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddfriendsPageRoutingModule
  ],
  declarations: [AddfriendsPage]
})
export class AddfriendsPageModule {}
