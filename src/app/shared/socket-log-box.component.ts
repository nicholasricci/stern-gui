import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {io, Socket} from "socket.io-client";
import SternLogMessage from "../model/stern-log-message";
import {FiltersService} from "../features/stern/filters.service";
import {SafeHtmlPipe} from "./safe-html.pipe";

@Component({
  selector: 'app-socket-log-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-y-scroll h-screen" tabindex="0">
      <ul class="flex flex-col-reverse">
        @for (message of messages(); track message) {
          <li class="badge badge-neutral h-auto w-auto p-4 mt-2">
            <span [innerHTML]="message.data | safeHtml"></span>
          </li>
        }
      </ul>
    </div>
  `,
  imports: [
    SafeHtmlPipe
  ],
  styles: ``
})
export class SocketLogBoxComponent implements OnInit, OnDestroy {
  filtersService = inject(FiltersService)

  deployment = input<string>('')
  messages = signal<SternLogMessage[]>([])
  running = input<boolean>(false)

  socket = io('/socket.io')
  logStreamEvent: Socket | undefined = undefined
  startLogStreamEvent: Socket | undefined = undefined

  startLogStream() {
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
      let m = this.splitAnsiEscapeCodes(message.data)
      m = m.map((part) => {
        let mpart = this.replaceEscapeSequencesWithHtml(part)
        mpart = this.replaceColorEscapeSequencesWithHtml(mpart)
        mpart = this.replaceBackgroundEscapeSequencesWithHtml(mpart)
        mpart = this.replaceCombinedEscapeSequencesWithHtml(mpart)
        return mpart
      })
      const mJoined = m.join(' ')
      const messagesFiltered = [...this.messages(), {data: mJoined}]
      if (this.messages().length > 30) {
        messagesFiltered.splice(0, 1)
      }
      this.messages.set(messagesFiltered)
    })
  }

  ngOnDestroy() {
    this.logStreamEvent?.off('log_stream')
  }

  splitAnsiEscapeCodes(input: string): string[] {
    // Pattern per abbinare le sequenze di escape descritte
    const pattern = /\\x1b\[\d+(?:;\d+){0,2}m/g;

    // Trova tutte le corrispondenze nella stringa di input
    const matches = input.match(pattern);

    // Splitta la stringa in base alle corrispondenze trovate
    let parts: string[] = [];
    let lastIndex = 0;

    matches?.forEach(match => {
      const index = input.indexOf(match, lastIndex);
      // Aggiungi il testo prima della sequenza di escape (se presente)
      if (index > lastIndex) {
        parts.push(input.substring(lastIndex, index));
      }
      // Aggiungi la sequenza di escape
      parts.push(match);
      lastIndex = index + match.length;
    });

    // Aggiungi l'ultima parte della stringa dopo l'ultima sequenza di escape
    if (lastIndex < input.length) {
      parts.push(input.substring(lastIndex));
    }

    return parts;
  }

  replaceEscapeSequencesWithHtml(input: string): string {
    return input
        .replace(/\\x1b\[0m/g, '</span>')
        .replace(/\\x1b\[1m/g, '<span style="font-weight: bold;">')
        .replace(/\\x1b\[4m/g, '<span style="text-decoration: underline;">')
        .replace(/\\x1b\[5m/g, '<span style="animation: blinker 1s linear infinite;">')
        .replace(/\\x1b\[21m/g, '</span>')
        .replace(/\\x1b\[21m/g, '</span>')
        .replace(/\\x1b\[24m/g, '</span>')
        .replace(/\\x1b\[25m/g, '</span>')
        .replace(/\\x1b\[0;22m/g, '</span>')
  }

  replaceColorEscapeSequencesWithHtml(input: string): string {
    const colorMap: { [key: string]: string } = {
      '30': 'black',
      '31': 'red',
      '32': 'green',
      '33': 'yellow',
      '34': 'blue',
      '35': 'magenta',
      '36': 'cyan',
      '37': 'white',
      '39': 'initial',  // Usa il colore di default del documento
      '90': 'lightgray',
      '91': '#ff6666',  // Light Red
      '92': '#90ee90',  // Light Green
      '93': '#ffff66',  // Light Yellow
      '94': '#add8e6',  // Light Blue
      '95': '#ff77ff',  // Light Magenta
      '96': '#e0ffff',  // Light Cyan
      '97': 'white'  // Light White
    };

    return input.replace(/\\x1b\[(3[0-9]|9[0-7])m/g, (match, p1) => {
      const color = colorMap[p1];
      return `<span style="color: ${color};">`;
    })
  }

  replaceBackgroundEscapeSequencesWithHtml(input: string): string {
    const bgColorMap: { [key: string]: string } = {
      '40': 'black',
      '41': 'red',
      '42': 'green',
      '43': 'yellow',
      '44': 'blue',
      '45': 'magenta',
      '46': 'cyan',
      '47': 'white',
      '49': 'initial',  // Usa il colore di sfondo di default del documento
      '100': 'lightgray',
      '101': '#ff6666',  // Light Red
      '102': '#90ee90',  // Light Green
      '103': '#ffff66',  // Light Yellow
      '104': '#add8e6',  // Light Blue
      '105': '#ff77ff',  // Light Magenta
      '106': '#e0ffff',  // Light Cyan
      '107': 'white'  // Light White
    };

    return input.replace(/\x1b\[(4[0-7]|10[0-7])m/g, (match, p1) => {
      const color = bgColorMap[p1];
      return `<span style="background-color: ${color};">`;
    })
  }

  replaceCombinedEscapeSequencesWithHtml(input: string): string {
    const colorMap: { [key: string]: string } = {
      '30': 'black',
      '31': 'red',
      '32': 'green',
      '33': 'yellow',
      '34': 'blue',
      '35': 'magenta',
      '36': 'cyan',
      '37': 'white',
      '39': 'initial',  // Usa il colore di default del documento
      '90': 'lightgray',
      '91': '#ff6666',  // Light Red
      '92': '#90ee90',  // Light Green
      '93': '#ffff66',  // Light Yellow
      '94': '#add8e6',  // Light Blue
      '95': '#ff77ff',  // Light Magenta
      '96': '#e0ffff',  // Light Cyan
      '97': 'white'  // Light White
    };

    const styleMap: { [key: string]: string } = {
      '1': 'font-weight: bold;', // Grassetto
      '4': 'font-weight: underline;', // Sottolineato
      '5': 'font-weight: underline;', // Blink FIXME
    };

    // Pattern per identificare le sequenze di colore e stile
    const pattern = /\\x1b\[(\d+);(\d+)m/g;

    // Funzione di sostituzione che applica colori e stili
    const replaceFunction = (match: string, styleCode: string, colorCode: string) => {
      const color = colorMap[colorCode] || 'initial' + '; background-color: red';
      const style = styleMap[styleCode] || '';
      return `<span style="color: ${color}; ${style}">`;
    };

    // Sostituzione delle sequenze di escape nel testo
    return input.replace(pattern, replaceFunction);
  }
}
