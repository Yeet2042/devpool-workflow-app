import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroPencilSquareSolid, heroPlusSolid, heroXMarkSolid  } from '@ng-icons/heroicons/solid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item, ItemStatus } from '../models/item';
import { FormControl } from '@angular/forms';
import { ENV_CONFIG } from '../../../env.config';
import { DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-items-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink, NgIf],
  providers: [provideIcons({ heroMagnifyingGlassSolid, heroPencilSquareSolid, heroPlusSolid, heroXMarkSolid })],
  templateUrl: './items-page.component.html',
  styleUrl: './items-page.component.scss'
})
export class ItemsPageComponent {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/items/all/`;

  authService = inject(AuthService)
  httpClient = inject(HttpClient);

  items: Item[] = [];
  filterItems = this.items;
  filterInput = new FormControl<string>('', { nonNullable: true })

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  constructor () {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.loggedInUser?.tokens.access_token}`
    })
    this.httpClient.get<Item[]>(this.apiUrl, { headers }).subscribe((items) => {
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
