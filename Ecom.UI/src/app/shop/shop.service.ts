import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';
import { ICategory } from '../shared/Models/Category';
import { map } from 'rxjs';
import { response } from 'express';
import { ShopParams } from '../shared/Models/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  BaseUrl = "https://localhost:7104/api/"

  constructor(private _HttpClient: HttpClient) { }

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
