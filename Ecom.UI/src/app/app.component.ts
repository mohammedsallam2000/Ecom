import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShopModule } from './shop/shop.module';
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { HomeModule } from './home/home.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { BasketModule } from './basket/basket.module';
import { BasketComponent } from './basket/basket.component';
import { BasketService } from './basket/basket.service';
import { error } from 'console';
import { OrderTotalsComponent } from './shared/components/order-totals/order-totals.component';
import { CheckoutModule } from './checkout/checkout.module';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { AccountModule } from './account/account.module';
import { AccountService } from './account/account.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CoreModule, NavBarComponent,
    SharedModule, HttpClientModule, ShopModule, ShopComponent, ShopItemComponent, SharedModule, HomeModule, NgxSpinnerModule, BasketModule
    , BasketComponent, OrderTotalsComponent, CheckoutModule, CheckoutComponent, AccountModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: loaderInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  constructor(private basketService: BasketService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.loadCurrentUser();
this.loadBasket();
    
  }

loadBasket(){
  const basketId = localStorage.getItem('basket_id')
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => {
          console.log('initialBasket')
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
}

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    // if (token) {

      this.accountService.loadCurrentUser(token).subscribe({
        next: () => {
          console.log('loaded successfully')
        },
        error: (err) => {
          console.log(err)
        }
      }
      );
    //}
  }

}
