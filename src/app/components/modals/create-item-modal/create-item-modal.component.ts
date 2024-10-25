import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { ItemService } from '../../../budget/item.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-create-item-modal',
  standalone: true,
  imports: [NgIf, NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ heroPlusSolid, heroXMarkSolid })],
  templateUrl: './create-item-modal.component.html',
  styleUrl: './create-item-modal.component.scss'
})
export class CreateItemModalComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  fb = inject(NonNullableFormBuilder)
  itemService = inject(ItemService)
  authServoce = inject(AuthService)

  user_id = this.authServoce.loggedInUser?.userProfile.user_id ?? 0

  title = this.fb.control<string>('', { validators: Validators.required })
  quantity = this.fb.control<number>(null!, { validators: [Validators.required, Validators.min(1)] })
  amount = this.fb.control<number>(null!, { validators: [Validators.required, Validators.min(0.0001)] })

  fg = this.fb.group({
    title: this.title,
    quantity: this.quantity,
    amount: this.amount,
  })

  error?: any

  onSubmit(): void {
    const item = {...this.fg.getRawValue(), user: { user_id: this.user_id } };
    this.itemService.add(item).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => (this.error = error)
    })
  }
}
