import { Injectable } from '@angular/core';
import { ShopParams } from '../shared/Models/ShopParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/Models/Pagination';
import { map } from 'rxjs';
import { ICategory, ICategoryCreate } from '../shared/Models/Category';
import { IProductsCreate } from '../shared/Models/Products';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BaseUrl = "https://localhost:44394/api/"

  constructor(private _HttpClient: HttpClient) { }

  createProduct(value :IProductsCreate){
    console.log("createvalue",value)
    return this._HttpClient.post(this.BaseUrl + 'Products/Add-new-Product', value)
  }
  createCategory(value :ICategoryCreate){
    console.log("createvalue",value)
    return this._HttpClient.post(this.BaseUrl + 'Categories/Add-new-Categories', value)
  }


  editCategory(value :ICategory){
    return this._HttpClient.put(this.BaseUrl + 'Categories/Update-exiting-Category-by-id',value)
  }

  deleteCategory(id :number){
    return this._HttpClient.delete(this.BaseUrl + 'Categories/Delete-Category-by-id/'+ id, { responseType: 'text' })
  }

  GetProducts(shopParams:ShopParams) {
    let params = new HttpParams();
    if (shopParams.categoryId !== 0) {
      params = params.append('categoryId', shopParams.categoryId.toString())
    }
    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort)
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search)
    }
    params = params.append('pageNumber', shopParams.pageNumber.toString())
    params = params.append('pageSize', shopParams.pageSize.toString())

    return this._HttpClient.get<IPagination>(this.BaseUrl + 'Products/Get-all-Products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      )
  }


  GetCategory() {
    return this._HttpClient.get<ICategory[]>(this.BaseUrl + 'Categories/Get-all-Categories')
  }
}
