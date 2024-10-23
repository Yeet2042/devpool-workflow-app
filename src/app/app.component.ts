import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InteractiveBubbleComponent } from './canvas/interactive-bubble/interactive-bubble.component';
import { NavbarComponent } from './navigator/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InteractiveBubbleComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
