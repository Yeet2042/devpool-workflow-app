import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class LoginPageComponent implements OnInit {
  homePage = routes.find(route => route.component === HomePageComponent)?.path;

  @Input()
  code = '';

  route = inject(ActivatedRoute)
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

  ngOnInit() {
    if (this.code) {
      this.authService
        .loginOauth2(this.code)
        .subscribe(() => this.router.navigate(['/budget']));
    }
  }

  onLogin() {
    this.authService.login(this.fg.getRawValue()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/budget';
        this.router.navigate([returnUrl]);
      },
      error: (error) => (this.error = error)
    });
  }

  onKeycloakLogin() {
    this.authService.getLoginOauth2RedirectUrl()
      .subscribe((v) => window.location.replace(v.redirectUrl))
  }
}
