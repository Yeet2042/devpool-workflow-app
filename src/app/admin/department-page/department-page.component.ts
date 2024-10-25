import { DatePipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheckSolid,
  heroMagnifyingGlassSolid,
  heroPencilSquareSolid,
  heroPlusSolid,
  heroXMarkSolid
} from '@ng-icons/heroicons/solid';
import { AuthService } from '../../auth/auth.service';
import { Department } from '../../auth/models/logged-in-user';
import { ItemService } from '../../budget/item.service';
import { ItemStatus } from '../../budget/models/item';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-department-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink, NgIf, ReactiveFormsModule],
  providers: [
    provideIcons({
      heroMagnifyingGlassSolid,
      heroXMarkSolid,
      heroCheckSolid,
      heroPencilSquareSolid,
      heroPlusSolid
    })
  ],
  templateUrl: './department-page.component.html',
  styleUrl: './department-page.component.scss'
})
export class DepartmentPageComponent {
  fb = inject(NonNullableFormBuilder)
  authService = inject(AuthService);
  httpClient = inject(HttpClient);
  itemService = inject(ItemService);
  adminService = inject(AdminService);

  departments: Department[] = [];
  filterDepartments = this.departments;
  filterInput = new FormControl<string>('', { nonNullable: true });

  pendingCount = 0;

  isModalOpen = false;

  selectedDepartmentId = 0;

  fg = this.fb.group({
    name: this.fb.control<string>('', { validators: Validators.required }),
  });

  openModal(department: Department) {
    this.isModalOpen = true;

    this.selectedDepartmentId = department.department_id
    this.fg.patchValue({
      name: department.name,
    })
  }

  closeModal() {
    this.isModalOpen = false;
    this.fg.reset();
  }

  error?: any

  onSubmit() {
    const department = {...this.fg.getRawValue()};
    this.adminService.editDepartment(department, this.selectedDepartmentId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => (this.error = error)
    })
  }

  onDelete(department: Department) {
    this.adminService.deleteDepartment(department.department_id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => console.log(error)
    })
  }

  constructor() {
    this.adminService.listDepartments().subscribe((departments) => {
      this.departments = departments;
      this.filterDepartments = departments;
    });
    this.itemService.list().subscribe((items) => {
      this.pendingCount = items.filter((item) => item.status === ItemStatus.PENDING).length;
    });
  }
}
