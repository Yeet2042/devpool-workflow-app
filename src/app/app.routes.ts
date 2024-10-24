import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'budget',
    loadChildren: () => import('./budget/budget.routes')
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
  }
];
