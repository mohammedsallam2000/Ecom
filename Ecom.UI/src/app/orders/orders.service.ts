import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  BaseUrl = "https://localhost:7104/api/"
  constructor(private http: HttpClient) { }


  GetHeaderToken(){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);
    return headers
  }
  
  getOrdersForUser(){
    let headers = new HttpHeaders();
    headers = this.GetHeaderToken();

    return this.http.get(this.BaseUrl+'Orders/get-orders-for-user',{headers});
  }

  getOrderDetails(id:number){
    let headers = new HttpHeaders();
    headers = this.GetHeaderToken();
    return this.http.get(this.BaseUrl+'Orders/get-order-by-id/'+id,{headers});
  }
}
