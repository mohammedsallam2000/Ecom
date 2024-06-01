import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../../shared/Models/Products';
import { ShopParams } from '../../../shared/Models/ShopParams';
import { AdminService } from '../../admin.service';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from '../../../shared/components/paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ICategory } from '../../../shared/Models/Category';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, PagingHeaderComponent, PaginationModule,ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  products: IProducts[];
  shopParams = new ShopParams()
  totalCount: number;
  categories: ICategory[];
  ProductForm: FormGroup;

  constructor(private _AdminService:AdminService,private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.GetProducts();
    this.GetCategories();
    this.createProductForm();
  }


  createProductForm() {
    this.ProductForm = this.formBuilder.group({
      createForm: this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        categoryId: ['', Validators.required],
        image: ['', Validators.required]
      }),
      editForm: this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        categoryId: ['', Validators.required],
        image: ['', Validators.required]
      })
    })
  }

  get createForm(): FormGroup {
    return this.ProductForm.get('createForm') as FormGroup;
  }


  get _name(){
    return this.createForm.get('name')
  }

  get _description(){
    return this.createForm.get('description')
  }


  get _price(){
    return this.createForm.get('price')
  }


  get _categoryId(){
    return this.createForm.get('categoryId')
  }

  get _image(){
    return this.createForm.get('image')
  }


  onSubmitCreate() {
    console.log('createForm',this.createForm.value)

    this._AdminService.createProduct(this.createForm.value).subscribe({
      next:()=>{alert('created success')},
      error:(err)=>{console.log(err)}
    })
  }

  GetProducts() {
    this._AdminService.GetProducts(this.shopParams).subscribe(res => {
      this.products = res.data;
      this.totalCount = res.count
      this.shopParams.pageNumber = res.pageNumber
      this.shopParams.pageSize = res.pageSize
    })
  }

  GetCategories() {
    this._AdminService.GetCategory().subscribe(res => {
      this.categories = res;
    })
  }

  onPageChange(event: any) {
    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber = event;
      this.GetProducts();
    }
  }
}
