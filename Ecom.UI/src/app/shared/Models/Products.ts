export interface IProducts {
    id: number
    categoryName: string
    productPicture: any
    name: string
    description: any
    price: number
  }


  export interface IProductsCreate {
    name: string
    description: string
    price: number
    categoryId: string
    image: File
  }