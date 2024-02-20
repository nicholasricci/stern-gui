import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'stern', loadComponent: () => import('./features/stern/stern.component') },
  { path: 'configs', loadComponent: () => import('./features/configs/configs.component') },
  { path: '', redirectTo: '/stern', pathMatch: 'full' }
];
