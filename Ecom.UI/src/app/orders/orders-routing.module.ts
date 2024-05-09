import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './Components/orders/orders.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { BreadcrumbComponent } from 'xng-breadcrumb';


const routes : Routes=[
  {path:'',component:OrdersComponent},
  {path:':id',component:OrderDetailsComponent,data:{breadcrumb: {alias:'OrderDetails'}}}
  ]
  
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class OrdersRoutingModule { }
