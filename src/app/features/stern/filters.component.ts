import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-row justify-center p-3 items-center gap-3">
      <button class="btn btn-primary" (click)="startLogStream()">Start log stream</button>
      <button class="btn btn-error" (click)="endLogStream()">End log stream</button>
    </div>
  `,
  styles: ``
})
export class FiltersComponent {
  @Output() startLogStreamEvent = new EventEmitter<void>()
  @Output() endLogStreamEvent = new EventEmitter<void>()

  startLogStream() {
    this.startLogStreamEvent.emit()
  }

  endLogStream() {
    this.endLogStreamEvent.emit()
  }
}
