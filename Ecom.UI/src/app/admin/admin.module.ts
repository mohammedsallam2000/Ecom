import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,ProductsComponent,CategoriesComponent
  ],
  exports:[ProductsComponent,CategoriesComponent]
})
export class AdminModule { }
