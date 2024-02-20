import {Component, inject, OnInit} from '@angular/core';
import {OcService} from "../../core/oc.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select-project',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="flex flex-row gap-3 mx-auto my-auto justify-center items-center pt-3">
      <div class="badge badge-outline flex-initial">current namespace: {{ocService.currentProject()}}</div>
      <select #projectsListSelect class="select select-bordered w-full max-w-xs" (change)="changeProject(projectsListSelect.value)">
        @for (project of ocService.projectsList(); track project) {
          <option [value]="project">{{ project }}</option>
        }
      </select>
    </div>
  `,
  styles: ``
})
export class SelectProjectComponent implements OnInit {
  ocService = inject(OcService)
  ngOnInit() {
    if (!this.ocService.currentProject()) {
      this.ocService.getCurrentProject()
    }
    if (this.ocService.projectsList().length === 0) {
      this.ocService.getProjectsList()
    }
  }

  changeProject(project: string) {
    this.ocService.changeProject(project)
  }
}
