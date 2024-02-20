import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';



@NgModule({
  declarations: [],
  imports: [PagingHeaderComponent,
    CommonModule,PaginationModule.forRoot()
  ],
  exports:[PaginationModule,PagingHeaderComponent]
})
export class SharedModule { }
