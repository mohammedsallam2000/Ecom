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
import { errorInterceptor } from './core/interceptors/error.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CoreModule, NavBarComponent,
    SharedModule, HttpClientModule, ShopModule, ShopComponent, ShopItemComponent, HomeModule],
  //providers: [{ provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {

  }

}
