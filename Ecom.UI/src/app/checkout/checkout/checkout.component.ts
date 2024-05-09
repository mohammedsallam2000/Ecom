import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { OrderTotalsComponent } from '../../shared/components/order-totals/order-totals.component';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from '../checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from '../checkout-review/checkout-review.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [OrderTotalsComponent,StepperComponent, CdkStepperModule,CheckoutAddressComponent,
    CheckoutDeliveryComponent,CheckoutPaymentComponent,CheckoutReviewComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkoutForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private _AccountService:AccountService){}

  ngOnInit(): void {
   this.createCheckoutForm();
   this.getAddressFormValues();
  }

  createCheckoutForm(){
    this.checkoutForm = this.formBuilder.group({
      addressForm:this.formBuilder.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        street:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        zipCode:['',Validators.required],
      }),
      deliveryForm:this.formBuilder.group({
        deliveryMethod:['',Validators.required]
      }),
      paymentForm:this.formBuilder.group({
        nameOnCard:['',Validators.required]
      })
    })
  }

  getAddressFormValues(){
    this._AccountService.GetUserAddress().subscribe({
      next:(address)=>{
        this.checkoutForm.get('addressForm').patchValue(address)
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
}
