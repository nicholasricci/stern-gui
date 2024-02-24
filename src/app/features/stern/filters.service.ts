import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  container = signal<string | undefined>('')
  containerState = signal<'running'|'waiting'|'terminated'|'all'>('all')
  exclude = signal<string | undefined>('')
  excludeContainer = signal<string | undefined>('')
  excludePod = signal<string | undefined>('')
  highlight = signal<string | undefined>('')
  include = signal<string | undefined>('')
  since = signal<string | undefined>('')

  changeFilters(filter: string, value: string) {
    switch (filter) {
      case 'container':
        this.container.set(value)
        break
      case 'containerState':
        this.containerState.set(value as 'running'|'waiting'|'terminated')
        break
      case 'exclude':
        this.exclude.set(value)
        break
      case 'excludeContainer':
        this.excludeContainer.set(value)
        break
      case 'excludePod':
        this.excludePod.set(value)
        break
      case 'highlight':
        this.highlight.set(value)
        break
      case 'include':
        this.include.set(value)
        break
      case 'since':
        this.since.set(value)
        break
    }
  }

  getFiltersStringToSendToServer() {
    let stringFilter = ''
    if (this.container()) {
      stringFilter += `--container ${this.container()} `
    }
    if (this.containerState() !== 'all') {
      stringFilter += `--container-state ${this.containerState()} `
    }
    if (this.exclude()) {
      stringFilter += `--exclude ${this.exclude()} `
    }
    if (this.excludeContainer()) {
      stringFilter += `--exclude-container ${this.excludeContainer()} `
    }
    if (this.excludePod()) {
      stringFilter += `--exclude-pod ${this.excludePod()} `
    }
    if (this.highlight()) {
      stringFilter += `--highlight ${this.highlight()} `
    }
    if (this.include()) {
      stringFilter += `--include ${this.include()} `
    }
    if (this.since()) {
      stringFilter += `--since ${this.since()} `
    }
    return stringFilter
  }
}
