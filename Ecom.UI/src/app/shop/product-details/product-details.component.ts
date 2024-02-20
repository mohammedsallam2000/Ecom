import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../shared/Models/Products';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  product:IProducts

constructor(private _ShopService :ShopService,private _ActivatedRoute :ActivatedRoute){
ActivatedRoute
}
ngOnInit(): void {
  this.loadProduct()
}
loadProduct(){
  this._ShopService.GetProduct(parseInt(this._ActivatedRoute.snapshot.paramMap.get('id')))
  .subscribe(res =>{
this.product = res
  });
}
}
