import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../../../shared/Models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{

  order:IOrder
constructor(private _OrdersService:OrdersService,private _BreadcrumbService:BreadcrumbService,
  private _ActivatedRoute:ActivatedRoute){
this._BreadcrumbService.set('@OrderDetails','')
}

  ngOnInit(): void {
    const id = +this._ActivatedRoute.snapshot.paramMap.get('id') // + cast to number
    this._OrdersService.getOrderDetails(id).subscribe({
      next:(order:IOrder)=> {
        this.order = order
        console.log(order.orderItem)
        this._BreadcrumbService.set('@OrderDetails',`order ${this.order.id} - ${this.order.orderStatus}`)
      },
      error:(err)=> {
        console.error(err)
      },
    })
  }

}
