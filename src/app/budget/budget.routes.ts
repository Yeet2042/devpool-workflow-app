import { Routes } from '@angular/router';
import { ItemsPageComponent } from './items-page/items-page.component';
import { ApprovePageComponent } from './approve-page/approve-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ItemsPageComponent
  },
  {
    path: 'approve',
    component: ApprovePageComponent
  }
];

export default routes;