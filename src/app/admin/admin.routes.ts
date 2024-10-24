import { Routes } from '@angular/router';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { DepartmentPageComponent } from './department-page/department-page.component';

export const routes: Routes = [
  {
    path: 'employee',
    component: EmployeePageComponent
  },
  {
    path: 'department',
    component: DepartmentPageComponent
  }
];

export default routes;