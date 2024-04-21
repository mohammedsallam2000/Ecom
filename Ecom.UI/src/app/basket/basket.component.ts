import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { IBasket, IBasketItem } from '../shared/Models/basket';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule,RouterLink,OrderTotalsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basket$ : Observable<IBasket>;
  constructor (private basketService:BasketService){

  }
  
  ngOnInit():void{
    this.basket$ = this.basketService.basket$;
  }

  incrementBasketItemQuantity(item:IBasketItem){
    this.basketService.incrementBasketItemQuantity(item);
  }

  decrementBasketItemQuantity(item:IBasketItem){
    this.basketService.decrementBasketItemQuantity(item);
  }

  removeItemFromBasket(item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
}
