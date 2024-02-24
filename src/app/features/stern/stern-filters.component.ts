import {Component, inject} from '@angular/core';
import {FiltersService} from "./filters.service";

@Component({
  selector: 'app-stern-filters',
  standalone: true,
  imports: [],
  template: `
    <div class="collapse bg-base-200 mt-2">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">
        Click me to show/hide stern filters
      </div>
      <div class="collapse-content">
        <div class="flex flex-col justify-center p-3 items-center gap-3">
          <label class="input input-bordered flex items-center gap-2 w-full">
            <span class="text-primary">Container</span>
            <input type="text"
                   class="grow"
                   placeholder="container"
                   #containerFilter
                   [value]="filterService.container()"
                   (change)="filterService.changeFilters('container', containerFilter.value)"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full">
            <span class="text-primary">Exclude</span>
            <input type="text"
                   class="grow"
                   placeholder="exclude"
                   #excludeFilter
                   [value]="filterService.exclude()"
                   (change)="filterService.changeFilters('exclude', excludeFilter.value)"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full">
            <span class="text-primary">Exclude container</span>
            <input type="text"
                   class="grow"
                   placeholder="exclude container"
                   #excludeContainerFilter
                   [value]="filterService.excludeContainer()"
                   (change)="filterService.changeFilters('excludeContainer', excludeContainerFilter.value)"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full">
            <span class="text-primary">Exclude pod</span>
            <input type="text"
                   class="grow"
                   placeholder="exclude pod"
                   #excludePodFilter
                   [value]="filterService.excludePod()"
                   (change)="filterService.changeFilters('excludePod', excludePodFilter.value)"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full">
            <span class="text-primary">Highlight</span>
            <input type="text"
                   class="grow"
                   placeholder="highlight"
                   #highlightFilter
                   [value]="filterService.highlight()"
                   (change)="filterService.changeFilters('highlight', highlightFilter.value)"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full">
            <span class="text-primary">Include</span>
            <input type="text"
                   class="grow"
                   placeholder="include"
                   #includeFilter
                   [value]="filterService.include()"
                   (change)="filterService.changeFilters('include', includeFilter.value)"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full">
            <span class="text-primary">Since</span>
            <input type="text"
                   class="grow"
                   placeholder="since"
                   #sinceFilter
                   [value]="filterService.since()"
                   (change)="filterService.changeFilters('since', sinceFilter.value)"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-primary">Container state</span>
            </div>
            <select class="select select-bordered w-full" #containerStateFilter
                    (change)="filterService.changeFilters('containerState', containerStateFilter.value)">
              <option value="all">All</option>
              <option value="running">Running</option>
              <option value="waiting">Waiting</option>
              <option value="terminated">Terminated</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class SternFiltersComponent {
  filterService = inject(FiltersService)
}
