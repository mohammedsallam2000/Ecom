import { CdkStepperModule } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/Models/basket';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOrder } from '../../shared/Models/order';
import { NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


declare var Stripe;
@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CdkStepperModule, ReactiveFormsModule, CommonModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements AfterViewInit {


  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this)
  loading: boolean = false;
  cardNumberValid: false;
  cardExpiryValid: false;
  cardCvcValid: false;
  @Input() checkoutForm: FormGroup;
  constructor(private _CheckoutService: CheckoutService, private _BasketService: BasketService, private _Router: Router) {

  }


  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51PExaPRrrInvKodiPsBCgxXBpqzViTr494GZECLROzvRPCLYeraCvrYjUbi8lzdVxiIerzuKdelyJrcjGc22jIm900X94NxWRE')
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler)

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler)

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler)

  }


  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();

  }


  // onChange({ error }) {
  //   if (error) {
  //     this.cardErrors = error.message;
  //   }

  //   else {
  //     this.cardErrors = null;
  //   }

  //   console.log(error)
  // }

  onChange(event) {
    if (event.error) {
      this.cardErrors = event.error.message;
    }

    else {
      this.cardErrors = null;
    }
switch(event.elementType){
  case 'cardNumber':
  this.cardNumberValid = event.complete;
  break;
  case 'cardExpiry':
  this.cardExpiryValid = event.complete;
  break;
  case 'cardCvc':
  this.cardCvcValid = event.complete;

}
  }

  async submitOrder() {
    this.loading = true;
    const basket = this._BasketService.getCurrentBasketValue()
    // const basket = this._BasketService.getCurrentBasketValue()
    // if(!basket){
    //   throw new error('This Basketcan not found');
    // }
    try {
      const createOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent) {
        console.log('Order submit successfully')
        // this._BasketService.deleteBasket(basket)

        this._BasketService.deleteLocalBasket(basket.id)
        const navigationExtras: NavigationExtras = { state: createOrder }
        this._Router.navigate(['checkout/success'], navigationExtras)
      } else {
        console.error('Payment error', paymentResult.error.message)
      }
      this.loading = false;
    }
    catch (error) {
      console.error(error);
      this.loading = false;

    }



// const basket = this._BasketService.getCurrentBasketValue()
//     const orderToCreate = this.getOrderToCreate(basket)
//     this._CheckoutService.createOrder(orderToCreate).subscribe({
//       next: (order: IOrder) => {
//         this.stripe.confirmCardPayment(basket.clientSecrete, {
//           payment_method: {
//             card: this.cardNumber,
//             billing_details: {
//               name: this.checkoutForm.get('paymentForm.nameOnCard').value
//             }
//           }
//         }).then(result => {
//           console.log(result)

//           if (result.paymentIntent) {
//             console.log('Order submit successfully')

//             this._BasketService.deleteLocalBasket(basket.id)
//             const navigationExtras: NavigationExtras = { state: order }
//             this._Router.navigate(['checkout/success'], navigationExtras)
//           } else {
//             console.error('Payment error', result.error.message)
//           }
//         })

//       },
//       error: (err) => {
//         console.log(err)
//       },
//     })
  }


  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecrete, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm.nameOnCard').value
        }
      }
    })
  }


  private async createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket)
    return this._CheckoutService.createOrder(orderToCreate).toPromise();
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm.deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    }
  }
}
