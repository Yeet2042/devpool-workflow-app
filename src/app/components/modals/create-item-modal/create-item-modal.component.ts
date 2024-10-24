import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-create-item-modal',
  standalone: true,
  imports: [NgIf, NgIconComponent],
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
}
