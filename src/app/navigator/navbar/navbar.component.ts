import { Component, inject, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroGlobeAsiaAustraliaSolid, heroSunSolid, heroPlusSolid, heroUserCircleSolid, heroChevronDownSolid } from '@ng-icons/heroicons/solid';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { routes } from '../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserDropdownComponent } from '../../components/user-dropdown/user-dropdown.component';
import { AuthService } from '../../auth/auth.service';
import { filter, Subscription } from 'rxjs';
import { CreateItemModalComponent } from '../../components/modals/create-item-modal/create-item-modal.component';
import { CreateDepartmentModalComponent } from '../../components/modals/create-department-modal/create-department-modal.component';
import { CreateEmployeeModalComponent } from '../../components/modals/create-employee-modal/create-employee-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, LoginButtonComponent, RouterLink, NgIf, UserDropdownComponent, CreateItemModalComponent, CreateDepartmentModalComponent, CreateEmployeeModalComponent],
  providers: [provideIcons({ heroGlobeAsiaAustraliaSolid, heroSunSolid, heroPlusSolid, heroUserCircleSolid, heroChevronDownSolid })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  homePage = routes.find(route => route.component === HomePageComponent)?.path;
  route = '';

  authService = inject(AuthService)
  private routeSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkCurrentRoute();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkCurrentRoute();
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  checkCurrentRoute() {
    const currentUrl = this.router.url;

    if (currentUrl === '/budget' || currentUrl === '/budget/approve') {
      this.route = "budget"
    } else if (currentUrl === '/admin/department') {
      this.route = "department"
    } else if (currentUrl === '/admin/employee') {
      this.route = "employee"
    } else {
      this.route = ''
    }
  }
}
