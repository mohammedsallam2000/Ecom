import { Component } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../Models/basket';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent {

  basketTotals$ : Observable<IBasketTotals>;

  constructor(private basketService:BasketService){

  }
  
  ngOnInit():void{
  this.basketTotals$ = this.basketService.basketTotal$
  }
}
