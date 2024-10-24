import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroPencilSquareSolid } from '@ng-icons/heroicons/solid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item, ItemStatus } from '../models/item';
import { FormControl } from '@angular/forms';
import { ENV_CONFIG } from '../../../env.config';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-approve-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink],
  providers: [provideIcons({ heroMagnifyingGlassSolid, heroPencilSquareSolid })],
  templateUrl: './approve-page.component.html',
  styleUrl: './approve-page.component.scss'
})
export class ApprovePageComponent {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/items/all/`;

  authService = inject(AuthService)
  httpClient = inject(HttpClient);

  items: Item[] = [];
  filterItems = this.items;
  filterInput = new FormControl<string>('', { nonNullable: true })

  constructor () {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.loggedInUser?.tokens.access_token}`
    })
    this.httpClient.get<Item[]>(this.apiUrl, { headers }).subscribe((items) => {
      this.items = items.filter(item => item.status === ItemStatus.PENDING);
      this.filterItems = items.filter(item => item.status === ItemStatus.PENDING);
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
