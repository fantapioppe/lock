import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListScreenPageRoutingModule } from './list-screen-routing.module';

import { ListScreenPage } from './list-screen.page';
import { SharedComponentModule } from '../components/sharedComponent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListScreenPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [ListScreenPage]
})
export class ListScreenPageModule {}
