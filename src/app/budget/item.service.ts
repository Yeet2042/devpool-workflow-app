import { inject, Injectable } from '@angular/core';
import { ENV_CONFIG } from '../../env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item, CreateItem, EditIem, ItemStatus } from './models/item';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private envConfig = inject(ENV_CONFIG)
  readonly apiUrl = `${this.envConfig.apiUrl}/items`;
  private httpClient = inject(HttpClient);

  authService = inject(AuthService)

  private createHeader() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.loggedInUser?.tokens.access_token}`
    })
  }

  list() {
    return this.httpClient.get<Item[]>(`${this.apiUrl}/all`, { headers: this.createHeader() });
  }

  add(item: CreateItem) {
    return this.httpClient.post<Item>(this.apiUrl, item, { headers: this.createHeader() });
  }

  edit(item: EditIem, item_id: number, department_id: number) {
    return this.httpClient.patch<Item>(`${this.apiUrl}/${department_id}/${item_id}`, item, { headers: this.createHeader() });
  }

  delete(item_id: number, department_id: number) {
    return this.httpClient.delete<void>(`${this.apiUrl}/${department_id}/${item_id}`, { headers: this.createHeader() })
  }

  approve(item_id: number, department_id: number) {
    return this.httpClient.patch(`${this.apiUrl}/${department_id}/${item_id}/approve`, {}, {
      headers: this.createHeader()
    });
  }

  reject(item_id: number, department_id: number) {
    return this.httpClient.patch(`${this.apiUrl}/${department_id}/${item_id}/reject`, {}, { headers: this.createHeader() });
  }
}
