import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewServizioLockPageRoutingModule } from './new-servizio-lock-routing.module';

import { NewServizioLockPage } from './new-servizio-lock.page';
import { SharedComponentModule } from '../components/sharedComponent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewServizioLockPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [NewServizioLockPage]
})
export class NewServizioLockPageModule {}
