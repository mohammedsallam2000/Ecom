import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/Models/basket';
import { error } from 'console';
import { IProducts } from '../shared/Models/Products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  BaseUrl = "https://localhost:7104/api/"
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) {
  }

  getBasket(id: string) {
    return this.http.get(this.BaseUrl + "Basket/Get-basket-item/" + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket)
          console.info(this.getCurrentBasketValue())
        })
      )
  }

  setBasket(basket: IBasket) {
    console.log("basket",basket)
    return this.http.post(this.BaseUrl + 'Basket/Update-basket', basket).subscribe({
      next:(res: IBasket) =>{
        this.basketSource.next(res);
        console.log(res)
      },
      error:(err)=> {
        console.error(err)
      },
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProducts, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity)
    console.log("itemToAdd",itemToAdd)
    const basket = this.getCurrentBasketValue() ?? this.createBasket()
    basket.basketItems = this.addOrUpdate(basket.basketItems, itemToAdd, quantity);
    return this.setBasket(basket);
  }


  private addOrUpdate(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = basketItems.findIndex(i => i.id === itemToAdd.id)
    if (index === -1) {
      itemToAdd.quantity = quantity
      basketItems.push(itemToAdd)
    }
    else {
      basketItems[index].quantity += quantity
    }
    return basketItems;
  }


  private createBasket(): IBasket {
    const basket = new Basket()
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }


  private mapProductItemToBasketItem(item: IProducts, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      productPicture: item.productPicture,
      category: item.categoryName,
      quantity
    }
  }


}