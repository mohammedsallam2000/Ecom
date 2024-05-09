import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutSuccessComponent } from '../shared/components/checkout-success/checkout-success.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,SharedModule,CdkStepperModule,CheckoutAddressComponent,CheckoutComponent,CheckoutDeliveryComponent,
    BasketSummaryComponent,RouterModule,SharedModule,CheckoutRoutingModule,CheckoutSuccessComponent
  ],
  exports:[CheckoutAddressComponent,CheckoutComponent,CheckoutDeliveryComponent,CheckoutRoutingModule],
  providers: [
   //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class CheckoutModule { }
