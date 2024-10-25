import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { loggedInGuard } from './auth/guards/logged-in.guard';
import { rolesGuard } from './auth/guards/roles.guard';
import { Role } from './auth/models/logged-in-user';

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
    loadChildren: () => import('./budget/budget.routes'),
    canActivate: [loggedInGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    canActivate: [loggedInGuard, rolesGuard([ Role.ADMIN ])]
  }
];
