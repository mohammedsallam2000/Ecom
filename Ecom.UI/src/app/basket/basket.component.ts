import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { IBasket } from '../shared/Models/basket';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule,RouterLink],
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
}
