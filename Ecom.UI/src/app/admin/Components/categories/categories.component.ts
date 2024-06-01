import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../shared/Models/Category';
import { AdminService } from '../../admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[];
  CategoryForm: FormGroup;
  constructor(private _AdminService:AdminService,private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.GetCategories() ;
    this.createCategoryForm();
  }


  
  createCategoryForm() {
    this.CategoryForm = this.formBuilder.group({
      createForm: this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      }),
      editForm: this.formBuilder.group({
        id:['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required]
      })
    })
  }

  get createForm(): FormGroup {
    return this.CategoryForm.get('createForm') as FormGroup;
  }

  get editForm(): FormGroup {
    return this.CategoryForm.get('editForm') as FormGroup;
  }

  get _name(){
    return this.createForm.get('name')
  }

  get _description(){
    return this.createForm.get('description')
  }

  onSubmitCreate() {
    console.log('createForm',this.createForm.value)

    this._AdminService.createCategory(this.createForm.value).subscribe({
      next:()=>{alert('created success')
      this.GetCategories();

    },
      error:(err)=>{console.log(err)}
    })
  }
// Delete
RowData: any = {
  id: null,
  name: null,
  description: null
}

FillRowData(Item: any) {
  this.RowData.id = Item.id;
  this.RowData.name = Item.name;
  this.RowData.description = Item.description;
}

onSubmitDelete() {
  // this._AdminService.deleteCategory(this.DeletedData.id).subscribe({
  //   next:()=>{alert('deleted success');
  // this.GetCategories();
  // },
  //   error:(err)=>{console.log(err)}
  // })

  this._AdminService.deleteCategory(this.RowData.id).subscribe((res) => {
    // alert(res)
  
    this.GetCategories();
    this.RowData = {};
  })

}

// Get All Categories
  GetCategories() {
    this._AdminService.GetCategory().subscribe(res => {
      this.categories = res;
    })
  }
}
