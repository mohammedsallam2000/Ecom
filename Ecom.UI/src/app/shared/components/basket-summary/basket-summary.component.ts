import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../Models/basket';
import { BasketService } from '../../../basket/basket.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderTotalsComponent } from '../order-totals/order-totals.component';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, OrderTotalsComponent],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss'
})
export class BasketSummaryComponent implements OnInit {
  basket$: Observable<IBasket>;
  //@Output() decrement:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  //@Output() increment:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  //@Output() remove:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
@Input() isBasket:boolean = true
  constructor(private basketService: BasketService) {

  }
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    console.log('isBasket',this.isBasket)
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    this.basketService.incrementBasketItemQuantity(item);
  }

  decrementBasketItemQuantity(item: IBasketItem) {
    this.basketService.decrementBasketItemQuantity(item);
  }

  removeItemFromBasket(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
}
