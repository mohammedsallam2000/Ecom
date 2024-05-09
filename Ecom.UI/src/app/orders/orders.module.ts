import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './Components/orders/orders.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,OrdersComponent,OrderDetailsComponent,OrdersRoutingModule
  ],
  exports:[OrdersComponent,OrderDetailsComponent]
})
export class OrdersModule { }
