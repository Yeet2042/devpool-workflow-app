import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroGlobeAsiaAustraliaSolid, heroSunSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ heroGlobeAsiaAustraliaSolid, heroSunSolid })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
