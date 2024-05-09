import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutSuccessComponent } from '../shared/components/checkout-success/checkout-success.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';

const routes : Routes=[
  {path:'',component:CheckoutComponent},
  {path:'success',component:CheckoutSuccessComponent}
  ]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
