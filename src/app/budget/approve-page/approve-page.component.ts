import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid } from '@ng-icons/heroicons/solid';
import { Item, ItemStatus } from '../models/item';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-approve-page',
  standalone: true,
  imports: [NgIconComponent, DatePipe, RouterLink],
  providers: [provideIcons({ heroMagnifyingGlassSolid, heroXMarkSolid, heroCheckSolid })],
  templateUrl: './approve-page.component.html',
  styleUrl: './approve-page.component.scss'
})
export class ApprovePageComponent {
  authService = inject(AuthService)
  itemService = inject(ItemService)

  items: Item[] = [];
  filterItems = this.items;
  filterInput = new FormControl<string>('', { nonNullable: true })

  onApprove(item: Item) {
    this.itemService.approve(item.item_id, item.department.department_id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => console.log(error)
    })
  }

  onReject(item: Item) {
    this.itemService.reject(item.item_id, item.department.department_id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => console.log(error)
    })
  }

  constructor () {
    const userProfile = this.authService.loggedInUser?.userProfile
    if (!userProfile) {
      return
    }
    if (userProfile.role === "ADMIN") {
      this.itemService.list().subscribe((items) => {
        this.items = items.filter(item => item.status === ItemStatus.PENDING);
        this.filterItems = items.filter(item => item.status === ItemStatus.PENDING);
      })
    } else {
      this.itemService.listWithDepartment(userProfile.department.name).subscribe((items) => {
        this.items = items.filter(item => item.status === ItemStatus.PENDING);
        this.filterItems = items.filter(item => item.status === ItemStatus.PENDING);
      })
    }
  }
}
