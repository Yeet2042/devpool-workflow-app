import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroPencilSquareSolid, heroPlusSolid, heroTrashSolid, heroXMarkSolid  } from '@ng-icons/heroicons/solid';
import { Item, ItemStatus } from '../models/item';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ENV_CONFIG } from '../../../env.config';
import { DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink, NgIf, ReactiveFormsModule],
  providers: [provideIcons({ heroMagnifyingGlassSolid, heroPencilSquareSolid, heroPlusSolid, heroXMarkSolid, heroTrashSolid })],
  templateUrl: './items-page.component.html',
  styleUrl: './items-page.component.scss'
})
export class ItemsPageComponent {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/items/all/`;

  fb = inject(NonNullableFormBuilder)
  authService = inject(AuthService)
  itemService = inject(ItemService)

  items: Item[] = [];
  filterItems = this.items;
  filterInput = new FormControl<string>('', { nonNullable: true })

  isModalOpen = false;

  selectedDepartmentId = 0;
  selectedItemId = 0;

  fg = this.fb.group({
    title: this.fb.control<string>('', { validators: Validators.required }),
    quantity: this.fb.control<number>(0, { validators: [Validators.required, Validators.min(1)] }),
    amount: this.fb.control<number>(0, { validators: [Validators.required, Validators.min(0.0001)] })
  });

  openModal(item: Item) {
    this.isModalOpen = true;
    this.selectedItemId = item.item_id,
    this.selectedDepartmentId = item.department.department_id,
    this.fg.patchValue({
      title: item.title,
      quantity: item.quantity,
      amount: item.amount
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.fg.reset();
  }

  error?: any

  onSubmit(): void {
    const formValue = this.fg.getRawValue();
    const amountAsNumber = Number(formValue.amount);
    const item = {
      ...formValue,
      amount: amountAsNumber
    };
    this.itemService.edit(item, this.selectedItemId, this.selectedDepartmentId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => (this.error = error)
    })
  }

  onDelete(item: Item) {
    this.itemService.delete(item.item_id, item.department.department_id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => console.log(error)
    })
  }

  constructor () {
    this.itemService.list().subscribe((items) => {
      this.items = items;
      this.filterItems = items;
    })
  }

  get approveCount(): number {
    return this.items.filter(item => item.status === ItemStatus.APPROVED).length;
  }
  get pendingCount(): number {
    return this.items.filter(item => item.status === ItemStatus.PENDING).length;
  }
  get rejectCount(): number {
    return this.items.filter(item => item.status === ItemStatus.REJECTED).length;
  }
}
