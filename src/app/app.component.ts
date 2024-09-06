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
    TicketCounterComponent,
    CurrencyPipe,
    NgIf,
    NgStyle,
    MakePaymentComponent,
    FormsModule,
  ],
  providers: [FlutterwaveService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(
    private flutterwaveService: FlutterwaveService,
  ) {}

  title = 'Downtown, Fest👑';

  tickets = [
    {
      title: 'VIP - access for 2',
      price: 50_000,
    },
    {
      title: 'Group - Of 5',
      price: 20_000,
    },
    {
      title: 'Couple - Access',
      price: 8_000,
    },
    {
      title: 'Downtown Fest - Regular',
      price: 5_000,
    },
  ];

  gallery = [
    "url('/gallery/1.jpg')",
    "url('/gallery/2.jpg')",
    "url('/gallery/3.jpg')",
  ];

  activeImage = 0;

  amounts = [0, 0, 0, 0];

  sum = (a: number, b: number) => a + b;

  
  publicKey = "FLWPUBK_TEST-1d98286bd3d8cc4673dfc7f99429c193-X";

  customizations = {
    title: "Downtown Fest👑",
    description: `Not your average shindig  - D.K (host)`,
    logo: "/favicon.png",
  };

  // meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  paymentData: (val: CustomerDetails) => InlinePaymentOptions = (customer) => ({
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: this.amounts.reduce(this.sum, 0),
    currency: "NGN",
    payment_options: "card,ussd",
    redirect_url: "",
    meta: {},
    customer,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this,
  });

  makePaymentCallback(response: PaymentSuccessResponse): void {
    if(response.status === 'completed'){
      this.amounts = [0, 0, 0, 0];
    }
    this.flutterwaveService.closePaymentModal(5);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}

interface CustomerDetails {
  name: "Demo Customer  Name",
  email: "customer@mail.com",
  phone_number: "08100000000",
}
