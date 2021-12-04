import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewServizioLockPage } from './new-servizio-lock.page';

const routes: Routes = [
  {
    path: '',
    component: NewServizioLockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewServizioLockPageRoutingModule {}
