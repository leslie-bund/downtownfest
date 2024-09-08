import { CurrencyPipe, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MakePaymentComponent, FlutterwaveService, PaymentSuccessResponse, InlinePaymentOptions } from 'flutterwave-angular-v3';
import { TicketCounterComponent } from '../../components/ticket-counter/ticket-counter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TicketCounterComponent,
    CurrencyPipe,
    NgIf,
    NgStyle,
    MakePaymentComponent,
    FormsModule,
  ],
  providers: [FlutterwaveService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(
    private flutterwaveService: FlutterwaveService,
  ) {}

  ngOnInit(): void {
    this.activeGallery = this.gallery
  }

  title = 'Downtown, Fest👑';

  activeGallery!: string[]

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

  lineUp = [
    "url('/gallery/lineup/six7even.jpg')",
    "url('/gallery/lineup/Poskidoo.jpg')",
    "url('/gallery/lineup/loye.jpg')",
    "url('/gallery/lineup/djBlondie.jpg')",
    "url('/gallery/lineup/djBiosky.jpg')",
    "url('/gallery/lineup/c-mart.jpg')",
    "url('/gallery/lineup/arizonaWave.jpg')",
  ];

  sponsors = [
    '/sponsors/94(dot)5.jpg',
    '/sponsors/city105(dot)1.jpg',
    '/sponsors/HipTv.jpg',
    '/sponsors/PalmAfrika.jpg',
    '/sponsors/elCarnaval.jpg',
  ]

  activeImage = 0;

  amounts = [0, 0, 0, 0];

  sum = (a: number, b: number) => a + b;

  
  publicKey = "FLWPUBK_TEST-1d98286bd3d8cc4673dfc7f99429c193-X";

  customizations = {
    title: "Downtown Fest👑",
    description: `Not your average shindig  - D.K (host)`,
    logo: "/public/favicon.png",
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
    this.amounts = [0, 0, 0, 0];
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

