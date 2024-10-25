import { Routes } from '@angular/router';
import { ItemsPageComponent } from './items-page/items-page.component';
import { ApprovePageComponent } from './approve-page/approve-page.component';
import { rolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/models/logged-in-user';

export const routes: Routes = [
  {
    path: '',
    component: ItemsPageComponent
  },
  {
    path: 'approve',
    component: ApprovePageComponent,
    canActivate: [rolesGuard([ Role.ADMIN, Role.APPROVER ])]
  }
];

export default routes;