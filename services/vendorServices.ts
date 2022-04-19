import { Request, Response, NextFunction } from "express";
import { client1 } from "../database/connectDB";
import * as QUERY from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { QueryResult } from "pg";
import{ products} from "../returnTypes"


export const addItem = async (req: Request): Promise<QueryResult|string> => {
  
    try {
      const product_id: string = uuidv4();
      const data:products[]=[req.body.product_name,req.body.brand_name]
      const found: QueryResult = await client1.query(QUERY.PRODUCT_EXISTS,data);
      if (found.rows.length === 0) {
        const data:products[]=[ product_id,req.body.product_name,req.body.brand_name,req.body.price,req.body.quantity,req.body.catogery,req.body.sub_catogery,]
        const result: QueryResult= await client1.query(QUERY.INSERT_PRODUCT,data);
         return (result);
      }
        return (`Product already exists with name ${req.body.product_name} and brand ${req.body.brand_name}`);
    } catch (error) {
      throw (error);
    }
  
};

export const updateItem = async (req: Request): Promise<string|products> => {
  
    try {
      let pname: string = "";
      let pbrand: string = "";
      let price: number = 0;
      let qty: number = 0;
      let cat: string = "";
      let subcat: string = "";
      
      const product: QueryResult= await client1.query(QUERY.VIEW_PRODUCT,[req.params.id]);
      if (product.rows.length === 0) {
        throw (`Product with ID:${req.params.id} does not exists`);   
      }
      const pd:products = product.rows[0];
      // console.log(pd);
      if (req.body.product_name !== pd.product_name) {
        pname = req.body.product_name;
      } else {
        pname = pd.product_name;
      }
      if (req.body.brand_name !== pd.brand_name) {
        pbrand = req.body.brand_name;
      } else {
        pbrand = pd.brand_name;
      }
      if (req.body.price !== pd.price) {
        price = req.body.price;
      } else {
        price = pd.price;
      }
      if (req.body.quantity !== pd.quantity) {
        qty = req.body.quantity;
      } else {
        qty = pd.quantity;
      }
      if (req.body.catogery !== pd.catogery) {
        cat = req.body.catogery;
      } else {
        cat = pd.catogery;
      }
      if (req.body.sub_catogery !== pd.sub_catogery) {
        subcat = req.body.sub_catogery;
      } else {
        subcat = pd.sub_catogery;
      }
      const data=[pname,pbrand,price,qty,cat,subcat,req.params.id]
      const result: products = await client1.query(QUERY.UPDATE_PRODUCT,data);
      return(result);
    } catch (error:unknown) {
      throw (error);
    }
  
};
  
export const showAll = async (req: Request): Promise<QueryResult[]> => { 
    try {      
      const result: QueryResult = await client1.query(QUERY.VIEW_PRODUCTS);
      const productList:QueryResult[]=result.rows
      console.log(productList)
     
      return(productList);
    } catch (error:unknown) {
      throw (error);
    }
    
};

export const deleteItem = async (req: Request): Promise<QueryResult[]> => {
  
    try { 
      const product:QueryResult= await client1.query(QUERY.VIEW_PRODUCT,[req.params.id]);
      if (product.rows.length === 0) {
        throw (`Product with ${req.params.id} doest not exists`);
      }
      const result:QueryResult[]= await client1.query(QUERY.DELETE_PRODUCT,[req.params.id]);
      return(result);
    } catch (error:unknown) { 
      throw  (error);
    }
  
};
   