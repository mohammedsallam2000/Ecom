import { CdkStepperModule } from '@angular/cdk/stepper';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/Models/basket';
import { FormGroup } from '@angular/forms';
import { IOrder } from '../../shared/Models/order';
import { NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CdkStepperModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkoutForm: FormGroup;
  constructor(private _CheckoutService: CheckoutService, private _BasketService: BasketService,private _Router:Router) {

  }

  ngOnInit(): void {

  }

  submitOrder() {
    const basket = this._BasketService.getCurrentBasketValue()
    const orderToCreate = this.getOrderToCreate(basket)
    this._CheckoutService.createOrder(orderToCreate).subscribe({
      next: (order:IOrder) => {
        console.log('Order submit successfully')
        this._BasketService.deleteLocalBasket(basket.id)
        const navigationExtras:NavigationExtras = {state:order}
        this._Router.navigate(['checkout/success'],navigationExtras)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm.deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    }
  }
}
