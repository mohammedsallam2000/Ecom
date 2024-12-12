import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../../shared/Models/order';
import { OrdersService } from '../../orders.service';
import { tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  Orders:IOrder[];
  constructor(private _OrdersService:OrdersService){}

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this._OrdersService.getOrdersForUser().subscribe({
      next:(order:IOrder[]) =>{
        if(order.length > 0)
        this.Orders = order;
        else
        this.Orders = null

      },
      error:(err)=> {
        console.error(err);
      },
    })
    
  }

}
