import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketCounterComponent } from './components/ticket-counter/ticket-counter.component';
import { CurrencyPipe, NgIf, NgStyle } from '@angular/common';
import { FlutterwaveService, InlinePaymentOptions, MakePaymentComponent, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}