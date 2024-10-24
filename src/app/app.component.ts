import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InteractiveBubbleComponent } from './canvas/interactive-bubble/interactive-bubble.component';
import { NavbarComponent } from './navigator/navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InteractiveBubbleComponent, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isAuthPage = false

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAuthPage = this.router.url.startsWith('/auth/');
    })
  }
}