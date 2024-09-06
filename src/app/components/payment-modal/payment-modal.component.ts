import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FlutterwaveModule,
  FlutterwaveService,
  InlinePaymentOptions,
  PaymentSuccessResponse,
  MakePaymentComponent,
} from "flutterwave-angular-v3";

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [MatDialogModule, ],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent {


}
