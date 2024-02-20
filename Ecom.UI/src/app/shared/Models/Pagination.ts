import { IProducts } from "./Products"

export interface IPagination {
    pageNumber: number
    pageSize: number
    count: number
    data: IProducts[]
  }

