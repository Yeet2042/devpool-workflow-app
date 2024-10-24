import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroGlobeAsiaAustraliaSolid, heroSunSolid } from '@ng-icons/heroicons/solid';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { routes } from '../../app.routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, LoginButtonComponent, RouterLink],
  providers: [provideIcons({ heroGlobeAsiaAustraliaSolid, heroSunSolid })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  homePage = routes.find(route => route.component === HomePageComponent)?.path;
}
