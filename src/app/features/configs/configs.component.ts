import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigsService} from "../../core/configs.service";
import Configs from "../../model/configs";

@Component({
  selector: 'app-configs',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="saveConfigs()"
          class="flex flex-row gap-3 mx-auto my-auto justify-center items-center pt-3"
    >
      <label class="input input-bordered flex items-center gap-2 w-full">
        Server Name
        <input type="text"
               class="grow"
               placeholder="https://k8s-server-api.com"
               #k8sServerInput
               formControlName="k8sServerControl"
        />
      </label>
      <button class="btn btn-primary" type="submit" [disabled]="!formGroup.valid">Save</button>
    </form>
  `,
  styles: ``
})
export default class ConfigsComponent implements OnInit {
  configsService = inject(ConfigsService)

  formGroup = new FormGroup({
    k8sServerControl: new FormControl('')
  })

  ngOnInit() {
    this.formGroup.setValue({
      k8sServerControl: this.configsService.configs()?.k8sApiServer || ''
    })
  }

  saveConfigs() {
    const configsToSave: Configs = {
      k8sApiServer: this.formGroup.value.k8sServerControl
    }
    this.configsService.saveConfigs(configsToSave).subscribe((configs: Configs) => {
      this.configsService.setConfigs(configs)
    })
  }
}
