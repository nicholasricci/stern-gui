import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {OcService} from "../../core/oc.service";

@Component({
  selector: 'app-select-deployment',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="flex flex-row gap-3 mx-auto my-auto justify-center items-center pt-3">
      <div class="badge badge-outline flex-initial">current deployment: {{ocService.currentDeployment()}}</div>
      <select #deploymentsListSelect class="select select-bordered w-full max-w-xs" (change)="changeDeployment(deploymentsListSelect.value)">
        @for (deployment of ocService.deploymentsList(); track deployment) {
          <option [value]="deployment">{{ deployment }}</option>
        }
      </select>
    </div>
  `,
  styles: ``
})
export class SelectDeploymentComponent {
  ocService = inject(OcService)

  changeDeployment(deployment: string) {
    this.ocService.changeDeployment(deployment)
  }
}
