//import Client from 'pg';
import { Client, ClientBase, QueryResult } from "pg";
import path from "path";

import {orderTable} from "../model/orderModel";
import {productTable}from"../model/productModel";
import{createUserTable}from "../model/userModel";

require("dotenv").config({ path: path.join(__dirname, "../config/.env") });

//Postgre database instance client
export const client1:any = new Client({
  host: process.env.dbHOST,
  port: Number(process.env.dbPORT),
  user: process.env.dbUSER,
  password: process.env.dbPASSWORD,
  database: process.env.dbDATABASE,
});

//Connection Function
export function connectDB() {
  client1.on("connect", async() => {
    console.log("Database Connection Successfull"); 
    await createUserTable();
    await productTable();
    await orderTable();
  });

  client1.on("error", (err:unknown) => {
    console.log("this is error", err);
  });
  client1.connect();
}

