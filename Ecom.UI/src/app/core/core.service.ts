import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  BaseUrl = "https://localhost:44394/api/"

  constructor(private _HttpClient: HttpClient) { }


  GetError(ErrorType : any){
    return this._HttpClient.get(this.BaseUrl+ErrorType)
  }

  // Get400Error(ErrorType : any){
  //   return this._HttpClient.get(this.BaseUrl+ErrorType)
  // }

  // Get500Error(ErrorType : any){
  //   return this._HttpClient.get(this.BaseUrl+ErrorType)
  // }


  // Get400ValidationError(ErrorType : any){
  //   return this._HttpClient.get(this.BaseUrl+ErrorType)
  // }
}
