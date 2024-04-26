import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, pipe } from 'rxjs';
import { IUser } from '../shared/Models/user';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BaseUrl = "https://localhost:7104/api/"
  private currentUser = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) { }

getCurrentUserValue(){
  return this.currentUser.value;
}

loadCurrentUser(token:string){
let headers = new HttpHeaders();
headers = headers.set('Authorization',`Bearer ${token}`);


return this.http.get(this.BaseUrl+'Account/get-current-user',{headers}).pipe(
  map((user:IUser)=>{
    if(user){
      localStorage.setItem('token',user.token);
      this.currentUser.next(user);
    }
  })
)
}

  Login(value: any) {
    return this.http.post(this.BaseUrl + 'Account/Login', value).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }

  register(value :any){
    return this.http.post(this.BaseUrl + 'Account/Register', value).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    )
  }

  logOut(){
    localStorage.removeItem('token');
    this.currentUser.next(null);
    //this._router.navigateByUrl('/')
  }

  checkEmailExist(email:string){
    return this.http.get(this.BaseUrl + 'Account/check-email-exist?email='+email);
  }
}
