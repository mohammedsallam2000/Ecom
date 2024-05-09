import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/Models/basket';
import { error } from 'console';
import { IProducts } from '../shared/Models/Products';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  BaseUrl = "https://localhost:7104/api/"
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  shipping: number = 0
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  private calculateTotal() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subTotal = basket.basketItems.reduce((a, c) => {
      return (c.price * c.quantity) + a
    }, 0);
    const total = shipping + subTotal;
    this.basketTotalSource.next({ shipping, subTotal, total });
  }

  constructor(private http: HttpClient) {
  }

  setShippingPrice(deliveryMethod:IDeliveryMethod){
this.shipping = deliveryMethod.price
this.calculateTotal()
  }

  getBasket(id: string) {
    return this.http.get(this.BaseUrl + "Basket/Get-basket-item/" + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket)
          //console.info(this.getCurrentBasketValue())
          this.calculateTotal();
        })
      )
  }

  setBasket(basket: IBasket) {
    console.log("basket", basket)
    return this.http.post(this.BaseUrl + 'Basket/Update-basket', basket).subscribe({
      next: (res: IBasket) => {
        this.basketSource.next(res);
        this.calculateTotal();
        // console.log(res)
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProducts, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity)
    console.log("itemToAdd", itemToAdd)
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

  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const itemIndex = basket.basketItems.findIndex(x => x.id === item.id)
    basket.basketItems[itemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const itemIndex = basket.basketItems.findIndex(x => x.id === item.id)
    if (basket.basketItems[itemIndex].quantity > 1) {
      basket.basketItems[itemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item)
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.basketItems.some(x => x.id === item.id)) {
      basket.basketItems = basket.basketItems.filter(x => x.id !== item.id)
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      }
      else {
        this.deleteBasket(basket);
      }
    }
  }

deleteLocalBasket(id:string){
this.basketSource.next(null)
this.basketTotalSource.next(null)
localStorage.removeItem('basket_id')
}

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.BaseUrl + 'Basket/Delete-basket-item/' + basket.id)
      .subscribe({
        next: () => {
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_id')
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

}