import { Request, Response, NextFunction } from "express";
import { client1 } from "../database/connectDB";
import * as QUERY from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { QueryResult } from 'pg'
import { order, products } from "../returnTypes";
import { userInfo } from "os";


export const viewList = async (req: Request): Promise<string | QueryResult[]> => {
  try {
      const search: string = `%${req.query.search}%`;
    if (req.query.search !== undefined) {
      const result: QueryResult = await client1.query(QUERY.VIEW_BY_SEARCH, search);
    if (result.rows.length === 0) {
        return ("Search Not Found");
      }
      return (result.rows);
    } else {
      const result: QueryResult = await client1.query(QUERY.VIEW_PRODUCTS);
      return (result.rows);
    }
  } catch (error:unknown) {
    throw (error);
  }

};

export const viewOne = async (req: Request): Promise<QueryResult[] | String> => {
  try {
    const search: string = `%${req.query.search}%`;
    const result: QueryResult = await client1.query(QUERY.VIEW_BY_SEARCH, [search]);
    if (result.rows.length === 0) {
      return ("Sorry Not Found Anything...Try Searching Other Things");
    }
    return result.rows;
  } catch (error:unknown) {
    throw (error);
  }
};

export const orderPlace = async (req: Request): Promise<products | string | QueryResult[]> => {
  try {
    const productList: QueryResult= await client1.query(QUERY.VIEW_PRODUCT, [req.params.id]);
    if (productList.rows.length === 0) {
      return (`Product with ID:${req.params.id} does not exists`);
    }
    const product: products = productList.rows[0];
    if (product.quantity > 0) {
      const order_id: string = uuidv4();
      //Creating the Order
      const userData:QueryResult = await client1.query(QUERY.VIEW_USER_BY_ID, [req.headers.user_id]);
      const data:object=[order_id,`${req.headers.user_id}`,userData.rows[0].username,`${product.product_id}`,product.product_name,product.price]

      const result: QueryResult = await client1.query(QUERY.INSERT_ORDER, data);
      //Reducing the total quantity by 1
      const args:Object=[product.quantity - 1,req.params.id]
      const updateData: QueryResult = await client1.query(QUERY.UPDATE_PRODUCT_QTY,args);
      
      const orderData:QueryResult = await client1.query(QUERY.VIEW_ORDER,[order_id]);
      if (result.rows) {
        return (orderData.rows[0]);   
      }
      return ("Oder Could Not be Placed");
    }
    return (`${product.product_name} is out of Stock..!`);
  } catch (error) { 
    throw (error);
  }

};

export const orderHistory = async (req: Request): Promise<QueryResult[]> => {
  try {
    const result: QueryResult = await client1.query(QUERY.VIEW_ORDERS);
    return (result.rows);
  } catch (error:unknown) {
     throw (error);
  }

};
