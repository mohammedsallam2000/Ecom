import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { SharedModule } from '../shared/shared.module';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';



@NgModule({
  declarations: [],
  imports: [
    ShopComponent,
    CommonModule,ShopItemComponent,PagingHeaderComponent,SharedModule
  ],
  exports:[ShopComponent]
})
export class ShopModule { }
