import { Component, Input } from '@angular/core';
import { IProducts } from '../../shared/Models/Products';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {
@Input() product :IProducts

constructor(private basketService:BasketService){

}

ngOnInit():void{

}

addItemToBasket()
{
  this.basketService.addItemToBasket(this.product)
}
}
