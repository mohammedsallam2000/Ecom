import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/basket';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../account/login/login.component';
import { AccountModule } from '../../account/account.module';
import { AccountService } from '../../account/account.service';
import { IUser } from '../../shared/Models/user';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,CommonModule,LoginComponent,AccountModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  basket$ : Observable<IBasket>;
  currentUser$ : Observable<IUser>;

constructor (private basketService:BasketService,private accountService:AccountService){

}

ngOnInit():void{
  this.basket$ = this.basketService.basket$;
  this.currentUser$ = this.accountService.currentUser$;
  console.log(this.currentUser$)
}

logOut(){
  this.accountService.logOut();
}
}
