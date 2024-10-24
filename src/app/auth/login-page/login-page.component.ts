import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';
import { HomePageComponent } from '../../home-page/home-page.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEnvelopeSolid, heroLockClosedSolid } from '@ng-icons/heroicons/solid';
import { AuthService } from '../auth.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, NgIconComponent, ReactiveFormsModule, NgIf],
  providers: [provideIcons({ heroEnvelopeSolid, heroLockClosedSolid })],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  homePage = routes.find(route => route.component === HomePageComponent)?.path;

  router = inject(Router)

  authService = inject(AuthService)

  fb = inject(NonNullableFormBuilder)
  email = this.fb.control('');
  password = this.fb.control('');

  fg = this.fb.group({
    email: this.email,
    password: this.password
  })

  error?: any

  onLogin() {
    this.authService.login(this.fg.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error;
        console.log(error.status);
      }
    })
  }
}
