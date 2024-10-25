import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid, heroPencilSquareSolid, heroPlusSolid } from '@ng-icons/heroicons/solid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Users } from '../models/user';
import { AdminService } from '../admin.service';
import { Role } from '../../auth/models/logged-in-user';
import { ItemStatus, User } from '../../budget/models/item';
import { ItemService } from '../../budget/item.service';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink, NgIf, ReactiveFormsModule],
  providers: [provideIcons({ heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid, heroPencilSquareSolid, heroPlusSolid })],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss'
})
export class EmployeePageComponent {
  fb = inject(NonNullableFormBuilder)
  authService = inject(AuthService)
  httpClient = inject(HttpClient);
  adminService = inject(AdminService)
  itemService = inject(ItemService)

  users: Users[] = [];
  filterUsers = this.users;
  filterInput = new FormControl<string>('', { nonNullable: true })

  pendingCount = 0;

  isModalOpen = false;

  selectedUserId = 0;

  fg = this.fb.group({
    department: this.fb.control<string>('', { validators: Validators.required }),
    name: this.fb.control<string>('', { validators: Validators.required }),
    email: this.fb.control<string>('', { validators: [Validators.required, Validators.email] }),
    password: this.fb.control<string>('', { validators: Validators.required }),
    role: this.fb.control<Role>(null!, { validators: Validators.required }),
  });

  openModal(user: User) {
    this.isModalOpen = true;

    this.selectedUserId = user.user_id;
    this.fg.patchValue({
      department: user.department.name,
      name: user.name,
      email: user.email,
      role: user.role
    })

  }

  closeModal() {
    this.isModalOpen = false;
    this.fg.reset();
    this.error = '';
  }

  error?: any

  onSubmit() {
    const departmentName = this.fg.get('department')?.value

    if (!departmentName) {
      console.error('Department name is required');
      return;
    }

    const user = {...this.fg.getRawValue(), department: { name: departmentName } };
    this.adminService.edit(user, this.selectedUserId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => (this.error = error)
    })
  }

  onDelete(user: User) {
    this.adminService.delete(user.user_id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => console.log(error)
    })
  }

  constructor() {
    this.adminService.listUsers().subscribe((users) => {
      this.users = users;
      this.filterUsers = users;
    })
    this.itemService.list().subscribe((items) => {
      this.pendingCount = items.filter(item => item.status === ItemStatus.PENDING).length
    })
  }
}
