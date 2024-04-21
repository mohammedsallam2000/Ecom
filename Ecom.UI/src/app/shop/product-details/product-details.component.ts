import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../shared/Models/Products';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product: IProducts
quantity:number=1
  constructor(private _ShopService: ShopService, private _ActivatedRoute: ActivatedRoute,private basketService:BasketService) {
    ActivatedRoute
  }
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct() {
    this._ShopService.GetProduct(parseInt(this._ActivatedRoute.snapshot.paramMap.get('id')))
      .subscribe(res => {
        this.product = res
      });
  }

  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.product,this.quantity)
  }

  incrementQuantity(){
    this.quantity++
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--
    }
  }

}
