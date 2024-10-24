import { Component } from '@angular/core';
import { LoginButtonComponent } from '../components/login-button/login-button.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LoginButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
