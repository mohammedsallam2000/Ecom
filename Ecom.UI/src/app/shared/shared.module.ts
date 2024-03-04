import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import {  CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';



@NgModule({
  declarations: [],
  imports: [PagingHeaderComponent,
    CommonModule,PaginationModule.forRoot(),CarouselModule.forRoot()
  ],
  exports:[PaginationModule,PagingHeaderComponent,CarouselModule]
})
export class SharedModule { }
