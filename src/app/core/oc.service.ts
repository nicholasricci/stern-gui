import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OcAuthService} from "./oc-auth.service";

@Injectable({
  providedIn: 'root'
})
export class OcService {
  http = inject(HttpClient)
  authService = inject(OcAuthService)

  currentProject = signal('')
  projectsList = signal<string[]>([])
  currentDeployment = signal('')
  deploymentsList = signal<string[]>([])

  getCurrentProject() {
    return this.http.get('/api/oc/current-project')
      .subscribe({
        next: (message: any) => {
          this.currentProject.set(message.current_project)
          this.getDeploymentsList()
        },
        error: (error) => {
          console.log('error: ', error)
          this.authService.setUserLoggedIn(false)
        }
      })
  }

  getProjectsList() {
    return this.http.get('/api/oc/projects')
      .subscribe({
        next: (message: any) => {
          const projects: string[] = message.projects.map((project: string) => {
            return project.replace('project.project.openshift.io/', '')
          })
          this.projectsList.set(projects)
        },
        error: (error) => {
          console.log('error: ', error)
          this.authService.setUserLoggedIn(false)
        }
      })
  }

  changeProject(project: string) {
    this.http.post('/api/oc/change-project', {project})
      .subscribe({
        next: (message) => {
          this.currentProject.set(project)
          this.getDeploymentsList()
        },
        error: (error) => {
          console.log('error: ', error)
          this.authService.setUserLoggedIn(false)
        }
      })
  }

  changeDeployment(deployment: string) {
    this.currentDeployment.set(deployment)
  }

  getDeploymentsList() {
    return this.http.get('/api/oc/deployments')
      .subscribe({
        next: (message: any) => {
          const deployments: string[] = message.deployments.map((deployment: string) => {
            return deployment.replace('deployment.apps/', '')
          })
          this.deploymentsList.set(deployments)
        },
        error: (error) => {
          console.log('error: ', error)
          this.authService.setUserLoggedIn(false)
        }
      })
  }
}
