import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroGlobeAsiaAustraliaSolid, heroSunSolid, heroPlusSolid, heroUserCircleSolid, heroChevronDownSolid } from '@ng-icons/heroicons/solid';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { routes } from '../../app.routes';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserDropdownComponent } from '../../components/user-dropdown/user-dropdown.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, LoginButtonComponent, RouterLink, NgIf, UserDropdownComponent],
  providers: [provideIcons({ heroGlobeAsiaAustraliaSolid, heroSunSolid, heroPlusSolid, heroUserCircleSolid, heroChevronDownSolid })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  homePage = routes.find(route => route.component === HomePageComponent)?.path;

  authService = inject(AuthService)
}
