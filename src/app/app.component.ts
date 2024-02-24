import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./core/navbar.component";
import MenuItem from "./model/menu-item";
import {OcAuthService} from "./core/oc-auth.service";
import {ConfigsService} from "./core/configs.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="container mx-auto">
      <app-navbar [menuItems]="menuItems">
        <router-outlet />
      </app-navbar>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  authService = inject(OcAuthService)
  configsService = inject(ConfigsService)

  menuItems: MenuItem[] = [
    {id: 1, label: 'Stern', routerLink: '/stern'},
    {id: 2, label: 'Configs', routerLink: '/configs'}
  ]

  ngOnInit() {
    this.authService.isUserLoggedIn()
    this.configsService.loadConfigs()
  }
}
