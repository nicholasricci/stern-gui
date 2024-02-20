import {Component, Input} from '@angular/core';
import MenuItem from "../model/menu-item";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="w-full navbar bg-base-300">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div class="flex-1 px-2 mx-2">{{title}}</div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
              <!-- Navbar menu content here -->
              @for(i of menuItems; track i.id) {
                <li><a [routerLink]="i.routerLink">{{i.label}}</a></li>
              }
            </ul>
          </div>
        </div>
        <!-- Page content here -->
        <ng-content></ng-content>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200">
          <!-- Sidebar content here -->
          @for(i of menuItems; track i.id) {
            <li><a [routerLink]="i.routerLink">{{i.label}}</a></li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: ``
})
export class NavbarComponent {
  @Input() title: string = 'Stern GUI'
  @Input() menuItems: MenuItem[] | undefined = undefined
}
