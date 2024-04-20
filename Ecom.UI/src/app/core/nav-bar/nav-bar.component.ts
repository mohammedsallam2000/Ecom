import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/basket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  basket$ : Observable<IBasket>;
constructor (private basketService:BasketService){

}

ngOnInit():void{
  this.basket$ = this.basketService.basket$;
}
}
