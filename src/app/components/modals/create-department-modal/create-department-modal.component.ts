import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-create-department-modal',
  standalone: true,
  imports: [NgIf, NgIconComponent],
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
}
