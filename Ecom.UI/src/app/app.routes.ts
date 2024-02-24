import { Routes } from '@angular/router';
import path from 'path';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { HomeComponent } from './home/home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'NotFound', component: NotFoundComponent},
    {path: 'ServerError', component: ServerErrorComponent},
    {path: 'testError', component: TestErrorComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'shop/:id', component: ProductDetailsComponent},
    {path: '**', redirectTo:'',pathMatch:'full'},

];
