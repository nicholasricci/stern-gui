import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ConfigsService} from "../../core/configs.service";

@Component({
  selector: 'app-configs',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="flex flex-row gap-3 mx-auto my-auto justify-center items-center pt-3">
      <label class="input input-bordered flex items-center gap-2 w-full">
        Server Name
        <input type="text"
               class="grow"
               placeholder="https://k8s-server-api.com"
               #k8sServerInput
               [value]="configsService.k8sApiServer()"
               (change)="changeK8sServer(k8sServerInput.value)"
        />
      </label>
    </div>
  `,
  styles: ``
})
export default class ConfigsComponent{
  configsService = inject(ConfigsService)

  changeK8sServer(server: string) {
    this.configsService.setK8sApiServer(server)
  }
}
