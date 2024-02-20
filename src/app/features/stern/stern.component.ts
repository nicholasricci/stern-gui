import {Component, inject, signal} from '@angular/core';
import {LoginComponent} from "../../shared/oc/login.component";
import {OcAuthService} from "../../core/oc-auth.service";
import {SelectProjectComponent} from "./select-project.component";
import {SelectDeploymentComponent} from "./select-deployment.component";
import {StreamLogComponent} from "./stream-log.component";
import {FiltersComponent} from "./filters.component";
import {OcService} from "../../core/oc.service";

@Component({
  selector: 'app-stern',
  standalone: true,
  imports: [
    LoginComponent,
    SelectProjectComponent,
    SelectDeploymentComponent,
    StreamLogComponent,
    FiltersComponent
  ],
  template: `
    @if(!authService.userLoggedIn()) {
        <app-login></app-login>
    } @else {
        <app-select-project />
        <app-select-deployment />
        <app-filters
          (startLogStreamEvent)="startLogStream()"
          (endLogStreamEvent)="stopLogStream()"
        />
        <app-stream-log
          [deployment]="ocService.currentDeployment()"
          [running]="streamLogRunning()"
        />
    }
  `,
  styles: ``
})
export default class SternComponent {
  authService = inject(OcAuthService)
  ocService = inject(OcService)

  streamLogRunning = signal(false)

  startLogStream() {
    console.log('start log stream')
    this.streamLogRunning.set(true)
  }

  stopLogStream() {
    console.log('stop log stream')
    this.streamLogRunning.set(false)
  }
}
