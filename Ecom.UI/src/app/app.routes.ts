import { Routes } from '@angular/router';
import path from 'path';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { HomeComponent } from './home/home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { BasketComponent } from './basket/basket.component';

export const routes: Routes = [
    {path: '', component: HomeComponent,data:{breadcrumb:'Home'}},
    {path: 'NotFound', component: NotFoundComponent,data:{breadcrumb:'NotFound'}},
    {path: 'ServerError', component: ServerErrorComponent,data:{breadcrumb:'ServerError'}},
    {path: 'testError', component: TestErrorComponent,data:{breadcrumb:'testError'}},
    {path: 'shop', component: ShopComponent,data:{breadcrumb:'shop'}},
    {path: 'basket', component: BasketComponent,data:{breadcrumb:'basket'}},
    {path: 'shop/:id', component: ProductDetailsComponent,data:{breadcrumb:'shop'}},
    {path: '**', redirectTo:'NotFound',pathMatch:'full'},

];
