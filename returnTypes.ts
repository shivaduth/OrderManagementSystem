import { Request } from "express"
import { type } from "os"
import { QueryResult } from "pg"


export type products={
  
    product_id?:string,
    product_name: string,
    brand_name: string,
    price: number,
    quantity: number,
    catogery: string,
    sub_catogery:string
}
export type user={
    user_id?:string,
    username:string,
    role:string
}
export type order ={
    order_id?:string,
    user_id:string,
    product_id:string,
    product_name:string,
    price:number
}
 

