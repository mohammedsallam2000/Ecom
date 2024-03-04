import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProducts } from '../shared/Models/Products';
import { CommonModule } from '@angular/common';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ICategory } from '../shared/Models/Category';
import { ShopParams } from '../shared/Models/ShopParams';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { loaderInterceptor } from '../core/interceptors/loader.interceptor';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: loaderInterceptor, multi: true }
  ],
  imports: [CommonModule, ShopItemComponent, PagingHeaderComponent, PaginationModule,NgxSpinnerModule]
})
export class ShopComponent implements OnInit {

  products: IProducts[];
  categories: ICategory[];
  totalCount: number;
  sortSelect: string = 'Name';
  shopParams = new ShopParams()
  sortOptions = [
    { name: 'Name', value: 'Name' },
    { name: 'Price : Max to Min', value: 'PriceDesc' },
    { name: 'Price : Min to Max', value: 'PriceAsyn' },


  ]
  @ViewChild('search') searchTerm: ElementRef;

  constructor(private _ShopService: ShopService) {

  }
  ngOnInit(): void {
    this.GetProducts();
    this.GetCategories();

  }
  GetProducts() {
    this._ShopService.GetProducts(this.shopParams).subscribe(res => {
      this.products = res.data;
      this.totalCount = res.count
      this.shopParams.pageNumber = res.pageNumber
      this.shopParams.pageSize = res.pageSize
      console.log(this.totalCount)
    })
  }

  GetCategories() {
    this._ShopService.GetCategory().subscribe(res => {
      this.categories = [{ id: 0, name: "All", description: "" }, ...res];
    })
  }

  onCategorySelect(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1
    this.GetProducts();
  }

  onSortSelect(sort: Event) {
    let sortValue = (sort.target as HTMLInputElement).value
    this.shopParams.sort = sortValue;
    this.GetProducts();
  }


  onPageChange(event: any) {
    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber = event;
      this.GetProducts();
    }

  }

  //   onSearch(searchTerm : any){
  // this.shopParams.search = searchTerm
  // this.GetProducts()
  //   }
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value
    this.GetProducts()
  }
  onReset() {
    this.searchTerm.nativeElement.value = ''
    this.shopParams = new ShopParams();
    this.GetProducts()
  }
}
