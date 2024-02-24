import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Configs from "../model/configs";

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {
  http = inject(HttpClient)
  configs = signal<Configs>({
    k8sApiServer: ''
  })

  loadConfigs() {
    return this.http.get<Configs>('/api/fs/configs')
      .subscribe((configs: Configs) => {
        this.setConfigs(configs)
      })
  }

  setConfigs(configs: Configs) {
    this.configs.set(configs)
  }

  saveConfigs(configs: Configs) {
    this.setConfigs(configs)
    return this.http.post<Configs>('/api/fs/configs', configs)
  }
}
