import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../Models/order';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent implements OnInit {

  order: IOrder
  constructor(private _Router: Router) {
    const navigation = this._Router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state
    if (state) {
      this.order = state as IOrder
    }
  }


  ngOnInit(): void {
    
  }
}
