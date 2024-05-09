import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from '../../shared/Models/deliveryMethod';
import { error } from 'console';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm: FormGroup
  deliveryMethod: IDeliveryMethod[]
  constructor(private checkoutService: CheckoutService,private _BasketService:BasketService) {
  }

  ngOnInit(): void {
    
    this.checkoutService.getDeliveryMethod().subscribe({
      next:(res: IDeliveryMethod[]) =>{
        this.deliveryMethod = res;
      },
      error: (err) => { console.error(err) }
    })
  }

  get deliveryForm(): FormGroup {
    return this.checkoutForm.get('deliveryForm') as FormGroup;
  }

  setShippingPrice(deliveryMethod:IDeliveryMethod){
this._BasketService.setShippingPrice(deliveryMethod);
  }
}
