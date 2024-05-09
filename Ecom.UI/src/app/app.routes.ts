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
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { skip } from 'rxjs';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CheckoutSuccessComponent } from './shared/components/checkout-success/checkout-success.component';
import { AboutComponent } from './shared/components/about/about.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { OrdersComponent } from './orders/Components/orders/orders.component';
import { OrderDetailsComponent } from './orders/Components/order-details/order-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
    { path: 'About', component: AboutComponent, data: { breadcrumb: 'About' } },
    { path: 'Contact', component: ContactComponent, data: { breadcrumb: 'Contact' } },
    { path: 'NotFound', component: NotFoundComponent, data: { breadcrumb: 'NotFound' } },
    { path: 'ServerError', component: ServerErrorComponent, data: { breadcrumb: 'ServerError' } },
    { path: 'testError', component: TestErrorComponent, data: { breadcrumb: 'testError' } },
    { path: 'shop', component: ShopComponent, data: { breadcrumb: 'shop' } },
    { path: 'basket', component: BasketComponent, data: { breadcrumb: 'basket' } },
    { path: 'shop/:id', component: ProductDetailsComponent, data: { breadcrumb: 'shop' } },
     { path: 'checkout', component: CheckoutComponent, data: { breadcrumb: 'checkout' } ,canActivate:[AuthGuard]},
     { path: 'checkout/success', component: CheckoutSuccessComponent, data: { breadcrumb: 'checkout' } ,canActivate:[AuthGuard]},
     { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'orders' },canActivate:[AuthGuard] }, //,canActivate:[AuthGuard] 
     { path: 'orders/:id', component: OrderDetailsComponent, data: { breadcrumb: {alias:'OrderDetails'}},canActivate:[AuthGuard] }, //,canActivate:[AuthGuard] 
    
    // { path: 'login', component: LoginComponent},
    // { path: 'register', component: RegisterComponent },

    // { path: 'orders',
    // canActivate:[AuthGuard], 
    // loadChildren: () => import('./orders/orders.module')
    // .then(mo => mo.OrdersModule), data: { breadcrumb: 'orders' } 
    // },

    { path: 'account', loadChildren: () => import('./account/account.module')
    .then(mo => mo.AccountModule), data: { breadcrumb: { skip: true } } },


    // { path: 'checkout', loadChildren: () => import('./checkout/checkout.module')
    // .then(mo => mo.CheckoutModule), data: { breadcrumb: { skip: true } } },


    { path: '**', redirectTo: 'NotFound', pathMatch: 'full' }

];
