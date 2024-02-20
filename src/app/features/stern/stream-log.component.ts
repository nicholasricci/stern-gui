import {Component, input} from '@angular/core';
import {SocketLogBoxComponent} from "../../shared/socket-log-box.component";

@Component({
  selector: 'app-stream-log',
  standalone: true,
  imports: [
    SocketLogBoxComponent
  ],
  template: `
    <div class="flex flex-row mx-auto my-auto justify-center items-center pt-3">
        <app-socket-log-box
          [deployment]="deployment()"
          [running]="running()"
        />
    </div>
  `,
  styles: ``
})
export class StreamLogComponent {
  deployment = input<string>('')
  running = input<boolean>(false)
}
