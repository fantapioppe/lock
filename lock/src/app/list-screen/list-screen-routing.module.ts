import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListScreenPage } from './list-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ListScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListScreenPageRoutingModule {}
