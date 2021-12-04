import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list-screen',
    loadChildren: () => import('./list-screen/list-screen.module').then( m => m.ListScreenPageModule)
  },
  {
    path: 'new-servizio-lock',
    loadChildren: () => import('./new-servizio-lock/new-servizio-lock.module').then( m => m.NewServizioLockPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
