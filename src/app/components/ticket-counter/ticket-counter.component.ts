import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ticket-counter',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './ticket-counter.component.html',
  styleUrl: './ticket-counter.component.css',
})
export class TicketCounterComponent {
  counter: number = 0;

  @Input() price!: number;
  @Input() title!: string;

  @Output() onCounterChange: EventEmitter<number> = new EventEmitter<number>();
}
