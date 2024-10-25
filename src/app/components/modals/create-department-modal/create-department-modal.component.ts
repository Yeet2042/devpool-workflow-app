import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { AdminService } from '../../../admin/admin.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-create-department-modal',
  standalone: true,
  imports: [NgIf, NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ heroPlusSolid, heroXMarkSolid })],
  templateUrl: './create-department-modal.component.html',
  styleUrl: './create-department-modal.component.scss'
})
export class CreateDepartmentModalComponent {
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

  name = this.fb.control<string>('', { validators: Validators.required })

  fg = this.fb.group({
    name: this.name
  })

  error?: any

  onSubmit(): void {
    const department = {...this.fg.getRawValue()};
    this.adminService.addDepartment(department).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => (this.error = error)
    })
  }
}
