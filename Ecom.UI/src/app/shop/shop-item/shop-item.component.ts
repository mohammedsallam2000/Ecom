import { Component, Input } from '@angular/core';
import { IProducts } from '../../shared/Models/Products';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {
@Input() product :IProducts
}
