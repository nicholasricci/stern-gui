import {inject, Injectable, signal} from '@angular/core';
import {LocalStorageService} from "../shared/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {
  localeStorageService = inject(LocalStorageService)
  k8sApiServer = signal('')

  setK8sApiServer(server: string) {
    this.k8sApiServer.set(server)
    this.localeStorageService.setItem('k8sApiServer', server)
  }

  getK8sApiServer() {
    if (this.k8sApiServer() === '') {
      this.k8sApiServer.set(this.localeStorageService.getItem('k8sApiServer') || '')
    }
    return this.k8sApiServer
  }
}
