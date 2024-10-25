import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownSolid, heroPlusSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { AdminService } from '../../../admin/admin.service';
import { AuthService } from '../../../auth/auth.service';
import { Role } from '../../../auth/models/logged-in-user';

@Component({
  selector: 'app-create-employee-modal',
  standalone: true,
  imports: [NgIf, NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ heroPlusSolid, heroXMarkSolid, heroChevronDownSolid })],
  templateUrl: './create-employee-modal.component.html',
  styleUrl: './create-employee-modal.component.scss'
})
export class CreateEmployeeModalComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  fb = inject(NonNullableFormBuilder)
  adminService = inject(AdminService)
  authServoce = inject(AuthService)

  department = this.fb.control<string>('', { validators: Validators.required })
  name = this.fb.control<string>('', { validators: Validators.required })
  email = this.fb.control<string>('', { validators: [Validators.required, Validators.email] })
  password = this.fb.control<string>('', { validators: Validators.required })
  role = this.fb.control<Role>(null!, { validators: Validators.required })

  fg = this.fb.group({
    department: this.department,
    name: this.name,
    email: this.email,
    password: this.password,
    role: this.role.value
  })

  error?: any

  onSubmit(): void {
    const user = {...this.fg.getRawValue(), department: { name: this.department.value } };
    this.adminService.addUser(user).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => (this.error = error)
    })
  }
}
