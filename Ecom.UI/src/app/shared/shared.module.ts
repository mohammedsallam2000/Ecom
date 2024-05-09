import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import {  CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';



@NgModule({
  declarations: [],
  imports: [
    PagingHeaderComponent,
    OrderTotalsComponent,
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    CheckoutSuccessComponent,
    AboutComponent,
    ContactComponent
  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    CheckoutSuccessComponent,
    AboutComponent,
    ContactComponent
  ]
})
export class SharedModule { }
