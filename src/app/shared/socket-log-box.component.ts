import {ChangeDetectionStrategy, Component, effect, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {io, Socket} from "socket.io-client";
import SternLogMessage from "../model/stern-log-message";
import {FiltersService} from "../features/stern/filters.service";

@Component({
  selector: 'app-socket-log-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-y-scroll h-screen" tabindex="0">
      <ul class="flex flex-col-reverse">
        @for (message of messages(); track message) {
          <li class="badge badge-info h-auto w-auto p-4 mt-2">
            {{ message.data }}
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``
})
export class SocketLogBoxComponent implements OnInit, OnDestroy {
  filtersService = inject(FiltersService)

  deployment = input<string>('')
  messages = signal<SternLogMessage[]>([])
  running = input<boolean>(false)

  socket = io('http://127.0.0.1:5000')
  logStreamEvent: Socket | undefined = undefined
  startLogStreamEvent: Socket | undefined = undefined

  startLogStream() {
    console.log(this.deployment())
    this.startLogStreamEvent?.off('start_log_stream')
    this.startLogStreamEvent = this.socket.emit(
      'start_log_stream', {
        deployment_name: this.deployment(),
        filters: this.filtersService.getFiltersStringToSendToServer()
      })
  }

  stopLogStream() {
    this.startLogStreamEvent?.off('start_log_stream')
    this.socket.emit('stop_log_stream')
  }

  constructor() {
    effect(() => {
      if (this.running()) {
        this.startLogStream()
      } else {
        this.stopLogStream()
      }
    });
  }


  ngOnInit(): void {
    this.logStreamEvent = this.socket.on('log_stream', (message: SternLogMessage) => {
      const messagesFiltered = [...this.messages(), message]
      if (this.messages().length > 30) {
        messagesFiltered.splice(0, 1)
      }
      this.messages.set(messagesFiltered)
    })
  }

  ngOnDestroy() {
    this.logStreamEvent?.off('log_stream')
  }
}
