import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownSolid, heroPlusSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-create-employee-modal',
  standalone: true,
  imports: [NgIf, NgIconComponent],
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
}
