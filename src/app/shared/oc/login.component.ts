import {Component, inject, signal} from '@angular/core';
import {OcAuthService} from "../../core/oc-auth.service";
import {FormsModule} from "@angular/forms";
import {ConfigsService} from "../../core/configs.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  template: `
    <div class="flex flex-row justify-center mx-auto columns-3 pt-3 gap-3">
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input type="text" class="grow" placeholder="Email" [(ngModel)]="email"/>
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
        <input type="password" class="grow" value="password" [(ngModel)]="password" />
      </label>
      @if (configsService.k8sApiServer()) {
        <button class="btn" (click)="login()">Login!</button>
      } @else {
        <a routerLink="/configs" class="btn">
          Go to config and configure at least k8s api server
        </a>
      }
    </div>
  `,
  styles: ``
})
export class LoginComponent {
  authService = inject(OcAuthService)
  configsService = inject(ConfigsService)

  email = ''
  password = ''

  login() {
    this.authService.login(this.email, this.password, this.configsService.k8sApiServer())
  }
}
