import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import {  CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';



@NgModule({
  declarations: [],
  imports: [PagingHeaderComponent,OrderTotalsComponent,
    CommonModule,PaginationModule.forRoot(),CarouselModule.forRoot()
  ],
  exports:[PaginationModule,PagingHeaderComponent,CarouselModule,OrderTotalsComponent]
})
export class SharedModule { }
