import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';
import { map } from 'rxjs';
import { IOrderToCreate } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  BaseUrl = "https://localhost:7104/api/"
  constructor(private http: HttpClient) { }

  GetHeaderToken(){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);
    return headers
  }

  getDeliveryMethod(){
    // let headers = new HttpHeaders();
    // const token = localStorage.getItem('token');
    // headers = headers.set('Authorization',`Bearer ${token}`);
    let headers = new HttpHeaders();
    headers = this.GetHeaderToken();

    return this.http.get(this.BaseUrl+'Orders/get-delivery-methods',{headers}).pipe(
      map((res:IDeliveryMethod[])=>{
        return res.sort((a,b)=>b.price-a.price);
      })
    )
  }


  createOrder(order:IOrderToCreate){
    let headers = new HttpHeaders();
    headers = this.GetHeaderToken();

    return this.http.post(this.BaseUrl+'Orders/create-order',order,{headers})
  }
}
